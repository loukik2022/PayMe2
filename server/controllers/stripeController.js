import { StripeMapping } from '../models/stripeMapping.js';
import { stripe } from '../config/stripeConfig.js';
import { createTransaction, updateTransaction } from '../controllers/transactionController.js';

// mapping (StripeId -> MongoID)
const customer_to_user = async (customerId) => {
    const mapping = await StripeMapping.findOne({ customerId: customerId });
    return mapping ? mapping.userId : null;
};
const invoice_to_transaction = async (invoiceId) => {
    const mapping = await StripeMapping.findOne({ invoiceId: invoiceId });
    return mapping ? mapping.transactionId : null; 
};
const product_to_subscription = async (productId) => {
    const mapping = await StripeMapping.findOne({ productId: productId });
    return mapping ? mapping.subscriptionId : null;
};

// mapping (MongoID -> StripeId)
const user_to_customer = async (userId) => {
    const mapping = await StripeMapping.findOne({ userId : userId });
    return mapping ? mapping.customerId : null;
};
const subscription_to_product = async (subscriptionId) => {
    const mapping = await StripeMapping.findOne({ subscriptionId: subscriptionId });
    return mapping ? mapping.productId : null;
};


// Transaction handling in db
const handlePaid = async (invoice) => {
    const userId = await customer_to_user(invoice.customer); 
    const subscriptionId = await product_to_subscription(invoice.subscription); 

    if (userId && subscriptionId) {
        const transactionData = {
            userId: userId,
            subscriptionId: subscriptionId,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'success',
            paymentMethod: 'card',
        };

        await createTransaction({ body: transactionData });
    } else {
        console.error('User ID or Subscription ID not found:', invoice.customer, invoice.subscription);
    }
};

const handlePaymentFailed = async (invoice) => {
    const transactionId = await invoice_to_transaction(invoice.id);
    const updateData = {
        status: 'failed'
    };

    if (transactionId) {
        await updateTransaction({ params: { transactionId }, body: updateData });
    } else {
        console.error('Transaction ID not found for invoice:', invoice.id);
    }
};

const handleTransactionUpdated = async (invoice) => {
    const transactionId = await invoice_to_transaction(invoice.id);
    const updateData = {
        amount: invoice.amount_due,
        currency: invoice.currency,
        status: 'pending'
    };

    if (transactionId) {
        await updateTransaction({ params: { transactionId }, body: updateData });
    } else {
        console.error('Transaction ID not found for invoice:', invoice.id);
    }
};

// User (Customer) and Subscription (Product) in Stripe
const stripeUserCreate = async (user) => {
    try {
        // Address required for cross country transaction (India Guideline)
        const address = {
            line1: user.billingAddress || 'Address',
            city: user.city || 'City',
            postal_code: user.postalCode || '123456',
            state: user.state || 'State',
            country: user.country || 'Country',
        };

        const customer = await stripe.customers.create({
            email: user.email,
            name: user.username,
            address: address,
        });
        console.log('Customer created:', customer);

        // save mpping of user to customer
        await StripeMapping.create({ 
            userId: user._id, 
            customerId: customer.id, 
        });

        return customer;
    } catch (error) {
        console.error('Error creating customer:', error.message);
    }
};

const stripeSubscriptionCreate = async (planDetails) => {
    console.log("creating stripe subscription");
    try {
        // Create a Product
        const product = await stripe.products.create({
            name: planDetails.planName,
            description: planDetails.description,
        });
        console.log('Product created:', product);

        // Create a Price
        const price = await stripe.prices.create({
            unit_amount: planDetails.price*100,
            currency: 'inr',
            recurring: {
                interval: planDetails.billingCycle,
            },
            product: product.id,
        });

        // save mapping of subscription to product
        await StripeMapping.create({ 
            subscriptionId: planDetails._id,  
            productId: product.id, 
        });

        console.log('Price created:', price);
    } catch (error) {
        console.error('Error creating subscription:', error.message);
    }
};

const stripeUserUpdate = async (userId, updateDetails) => {
    try {
        // Update the customer in Stripe
        const customerId = await user_to_customer(userId)

        const updatedCustomer = await stripe.customers.update(customerId, { 
            email: updateDetails.email || user.email,
            name: updateDetails.username || user.username,
            address: {
                line1: updateDetails.billingAddress || user.billingAddress,
                city: updateDetails.city || user.city,
                postal_code: updateDetails.postalCode || user.postalCode,
                state: updateDetails.state || user.state,
                country: updateDetails.country || user.country,
            },
        });
        console.log('Customer updated in Stripe:', updatedCustomer);
    } catch (error) {
        console.error('Error updating Customer:', error.message);
    }
};

const stripeSubscriptionUpdate = async (subscriptionId, updateDetails) => {
    try {
        // Update Subscription in Stripe
        const productId = await subscription_to_product(subscriptionId)

        const subscription = await stripe.subscriptions.update(productId, { 
            cancel_at_period_end: updateDetails.cancelAtPeriodEnd,
            items: [{
                id: subscription.items.data[0].id,
                price: updateDetails.newPriceId,
            }],
        });
        console.log('Subscription updated in Stripe:', subscription);
    } catch (error) {
        console.error('Error updating subscription:', error.message);
    }
};

export { handlePaid, handlePaymentFailed, handleTransactionUpdated, stripeUserCreate, stripeUserUpdate, stripeSubscriptionCreate, stripeSubscriptionUpdate };
