import { stripe } from "./config/stripeConfig.js";
import express from 'express';

const stripeService = express.Router();

const domain = `http://localhost:5173/stripe`;

stripeService.post('/create-checkout-session', async (req, res) => {
    // use subscription db instead
    const prices = await stripe.prices.list({
        lookup_keys: [req.body.lookup_key],
        expand: ['data.product'],
    });

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

    res.status(202).json({url: session.url})
});

stripeService.post('/create-portal-session', async (req, res) => {
    const { session_id } = req.body;

    // console.log(session_id) // undefined -> need to activate billing from stripe dashboard

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const returnUrl = `http://localhost:5173`; // home page

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: returnUrl,
    });
    
    res.status(202).json({url: portalSession.url})
});


stripeService.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    let event = req.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_12345';
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return res.sendStatus(400);
        }
    }
    let subscription;
    let status;
    // Handle the event
    if (event.type === 'customer.subscription.trial_will_end') {    // active -> inactive
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
    } else if (event.type === 'customer.subscription.deleted') {    // active -> inactive
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
    } else if (event.type === 'customer.subscription.created') {    // active (created)
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
    } else if (event.type === 'customer.subscription.updated') {    // active -> updated active (change subscription plan)
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
    } else if (event.type === 'entitlements.active_entitlement_summary.updated') {      // change in subscription features/service
        subscription = event.data.object;
        console.log(`Active entitlement summary updated for ${subscription}.`);
        // Then define and call a method to handle active entitlement summary updated
        // handleEntitlementUpdated(subscription);
    } else {
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 res to acknowledge receipt of the event
    res.send();
}
);

export default stripeService;