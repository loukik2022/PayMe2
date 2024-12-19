import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'Rs',
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
