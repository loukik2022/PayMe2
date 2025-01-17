import express from 'express';
import { stripe } from "./config/stripeConfig.js";
import { 
    handlePaid,
    handlePaymentFailed,
    handleTransactionUpdated
} from "./controllers/stripeController.js";
import { StripeMapping } from './models/stripeMapping.js';


const stripeService = express.Router();
const domain = `http://localhost:5173/stripe`;

const subscription_to_product = async (subscriptionId) => {
    const mapping = await StripeMapping.findOne({ subscriptionId: subscriptionId });
    return mapping ? mapping.productId : null;
};

stripeService.post('/create-checkout-session', async (req, res) => {
    // get subscriptionId from client
    const subscriptionId = req.body.paymentData;
    const productId = await subscription_to_product(subscriptionId);

    // get prices from stripe product
    const product = await stripe.products.retrieve(productId);  
    const prices = await stripe.prices.list({ product: product.id, });

    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'required',
        line_items: [
            {
                price: prices.data[0].id,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${domain}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}?canceled=true`,
    });

    res.status(202).json({ url: session.url })
});

stripeService.post('/create-portal-session', async (req, res) => {
    const { session_id } = req.body;

    // console.log(session_id) // undefined -> need to activate billing from stripe dashboard first

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const returnUrl = `http://localhost:5173`; // home page

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: returnUrl,
    });

    res.status(202).json({ url: portalSession.url })
});


stripeService.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    const signature = req.headers['stripe-signature'];

    try {
        // console.log(Buffer.isBuffer(req.body)) // Must be true (because stripe want raw req.body not parsed)

        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            endpointSecret
        );
    } catch (err) {
        console.error('Error constructing event:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (event.type) {
            case 'invoice.paid':
                await handlePaid(event.data.object);
                break;
            case 'invoice.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;
            // case 'invoice.updated':
            //     await handleTransactionUpdated(event.data.object);
            //     break;
        }

        res.status(200).send('Event received');
    } catch (err) {
        console.error(`Error handling event: ${event.type}`, err.message);
        res.status(500).send('Internal server error');
    }
}
);



export default stripeService;