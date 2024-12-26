import mongoose from 'mongoose';
import { User } from '../models/user.js'; // Adjust the path as necessary
import { Subscription } from '../models/subscription.js'; // Adjust the path as necessary

/*
- check for missing required fields in client request (userID, subscriptionId, amount, currency, status)
- only user existed in db must be able to do transaction
- only subscription plan existed in db must be allowed for transaction
- amount field must be positive
- status must be one of `pending`, `success`, `failed`
*/

const checkMissingFields = async (req, res, next) => {
    const { userId, subscriptionId, amount, currency, status } = req.body;

    // Check for missing required fields
    if (!userId || !subscriptionId || !amount || !currency || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    next();
};

const checkUserExists = async (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
    }

    next();
};

const checkSubscriptionExists = async (req, res, next) => {
    const { subscriptionId } = req.body;

    // Check if subscriptionId is a valid Object ID
    if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
        return res.status(400).json({ error: 'Invalid subscription ID format' });
    }
    // Check if subscription exists in the database and must be Object Id 
    const subscriptionExists = await Subscription.findById(subscriptionId);
    if (!subscriptionExists) {
        return res.status(404).json({ error: 'Subscription not found' });
    }

    next();
};

const validateAmountStatus = async (req, res, next) => {
    const { amount, status } = req.body;

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    // Validate status (intially pending, then either success or failed)
    const validStatuses = ['pending', 'success', 'failed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status must be one of: pending, success, failed' });
    }

    next();
};

export { checkMissingFields, checkUserExists, checkSubscriptionExists, validateAmountStatus };