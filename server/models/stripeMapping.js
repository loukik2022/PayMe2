import mongoose from 'mongoose';

const stripeSchema = new mongoose.Schema({
        // Internal user ID, mapped to Stripe's customer ID
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
        },
        customerId: {
            type: String, 
        },
        
        // Internal transaction ID, mapped to Stripe's invoice ID
        transactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction', 
        },
        invoiceId: {
            type: String, 
        },
        
        // Internal subscription ID, mapped to Stripe's product ID
        subscriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription', 
        },
        productId: {
            type: String,
        },
    },
    { timestamps: true }
);

export const StripeMapping = mongoose.model('StripeMapping', stripeSchema);
