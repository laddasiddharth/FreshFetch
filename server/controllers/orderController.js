import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import stripe from "stripe";

const TAX_RATE = 0.02;

// Validate items and price them from the database (never trust client prices).
// Returns { items, lineItems, amount } or throws an Error with a user-facing message.
const priceItems = async (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Invalid data");
    }

    const lineItems = [];
    let subtotal = 0;
    for (const item of items) {
        const quantity = Number(item?.quantity);
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new Error("Invalid quantity");
        }
        const product = await Product.findById(item.product);
        if (!product) {
            throw new Error("A product in your cart no longer exists");
        }
        if (!product.inStock) {
            throw new Error(`${product.name} is out of stock`);
        }
        lineItems.push({ name: product.name, price: product.offerPrice, quantity });
        subtotal += product.offerPrice * quantity;
    }

    // add tax charge (2%)
    const amount = Math.round(subtotal * (1 + TAX_RATE) * 100) / 100;
    return {
        items: items.map((item) => ({ product: item.product, quantity: Number(item.quantity) })),
        lineItems,
        amount,
    };
};

// Place Order COD : /api/order/cod
export const placeOrderCOD = async(req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;
        if (!address) {
            return res.json({success: false, message: "Invalid data"})
        }
        const priced = await priceItems(items);

        await Order.create({
            userId,
            items: priced.items,
            amount: priced.amount,
            address,
            paymentType: "COD"
        });

        // Clear the saved cart once the order is placed
        await User.findByIdAndUpdate(userId, {cartItems: {}});

        return res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async(req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;
        const {origin} = req.headers;
        if (!address) {
            return res.json({success: false, message: "Invalid data"})
        }
        const priced = await priceItems(items);

        const order = await Order.create({
            userId,
            items: priced.items,
            amount: priced.amount,
            address,
            paymentType: "Online"
        });

        // Stripe gateway initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        // Create line items for stripe (price includes 2% tax, in cents)
        const line_items = priced.lineItems.map((item)=> ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * (1 + TAX_RATE) * 100)
            },
            quantity: item.quantity,
        }))

        // Create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({success: true, url: session.url})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//Stripe Webhooks to Verify Payments Action: /stripe
export const stripeWebhooks = async(request, response) => {
    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${error.message}`)
    }

    try {
        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
            case "payment_intent.payment_failed": {
                const paymentIntentId = event.data.object.id;

                // Getting session metadata
                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId,
                })
                const metadata = session.data[0]?.metadata;
                if (!metadata?.orderId) break;

                if (event.type === "payment_intent.succeeded") {
                    // Mark payment as paid
                    await Order.findByIdAndUpdate(metadata.orderId, {isPaid: true})
                    // Clear user cart
                    await User.findByIdAndUpdate(metadata.userId, {cartItems: {}});
                } else {
                    await Order.findByIdAndDelete(metadata.orderId);
                }
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`)
                break;
        }
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({received: false, message: error.message});
    }
    response.json({received: true})
}

// Get Orders by User ID: /api/order/user
export const getUserOrders = async(req, res)=> {
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or : [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});

        res.json({success: true, orders})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Get All Orders (for seller / admin) : /api/order/seller
export const getAllOrders = async(req, res)=> {
    try {
        const orders = await Order.find({
            $or : [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});

        res.json({success: true, orders})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}