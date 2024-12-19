import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.model('User', userSchema)


/* #TODO
Add indexes to frequently queried fields like email, userId, and status to improve performance:

userSchema.index({ email: 1 });
transactionSchema.index({ userId: 1, status: 1 });
subscriptionSchema.index({ userId: 1, status: 1 });
*/
