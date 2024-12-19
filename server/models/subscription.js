import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    planName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    billingCycle: {
        type: String,
        enum: ['monthly', 'yearly'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: null, // active subscriptions
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active',
    },
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
