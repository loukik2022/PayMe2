import { Transaction } from "../models/transaction.js";

/*
- Create Transaction
- Update Transaction
- Delete Transaction
- Get All Transactions for a user
*/

const createTransaction = async (req, res) => {
    const { userId, subscriptionId, amount, currency, status, paymentMethod } = req.body;

    try {
        const newTransaction = new Transaction({
            userId,
            subscriptionId,
            amount,
            currency,
            status,
            paymentMethod,
        });

        await newTransaction.save();

        return res.status(201).json(newTransaction);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    const { transactionId } = req.params;
    const updates = req.body;

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        for (const key of Object.keys(updates)) {
            if (transaction[key] !== updates[key]) {
                transaction[key] = updates[key];
            }
        }

        await transaction.save();

        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findByIdAndDelete(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getUserTransaction = async (req, res) => {
    const { userId } = req.params;

    try {
        const transactions = await Transaction.find({ userId });

        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this user." });
        }

        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getUserTransaction
};