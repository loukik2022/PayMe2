import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active',
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
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
