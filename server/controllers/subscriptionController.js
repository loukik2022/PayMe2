import { Subscription } from "../models/subscription.js";

/*
- Get all subscription info

# admin
- Create subscription
- Delete subscription
- Update subscription
*/

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        return res.status(200).json(subscriptions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createSubscription = async (req, res) => {
    const { planName, price, description, billingCycle, startDate, endDate, status } = req.body;

    try {
        const newSubscription = new Subscription({
            planName,
            price,
            description,
            status,
            billingCycle,
            startDate,
            endDate,
        });
        
        await newSubscription.save();
        return res.status(201).json(newSubscription);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateSubscription = async (req, res) => {
    const { subscriptionId } = req.params;
    const updates = req.body;

    try {
        const subscription = await Subscription.findById(subscriptionId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        for (const key of Object.keys(updates)) {
            if (subscription[key] !== updates[key]) {
                subscription[key] = updates[key];
            }
        }

        await subscription.save();
        return res.status(200).json(subscription);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteSubscription = async (req, res) => {
    const { subscriptionId } = req.params;

    try {
        const subscription = await Subscription.findByIdAndDelete(subscriptionId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        return res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export {
    getAllSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription,
};
