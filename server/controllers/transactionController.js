import Stripe from 'stripe';
import dotenv from 'dotenv';
import { Transaction } from "../models/transaction.js";
dotenv.config();

/*
- Create Transaction
- Update Transaction
- Delete Transaction
- Get All Transactions for a user
*/

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createTransaction = async (req, res) => {
    const { userId, subscriptionId, amount, currency, status, paymentMethod } = req.body;

    try {
        // Create a new transaction in the database
        const newTransaction = new Transaction({
            userId,
            subscriptionId,
            amount,
            currency,
            status,
            paymentMethod,
        });

        // Save the transaction to the database
        await newTransaction.save();

        // Respond with the created transaction
        return res.status(201).json(newTransaction);
    } catch (error) {
        // Handle errors (e.g., payment failure, database errors)
        return res.status(500).json({ error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    const { transactionId } = req.params; // Get transaction ID from request parameters
    const updates = req.body; // Get updated fields from request body

    try {
        // Find the transaction by ID
        const transaction = await Transaction.findById(transactionId);
        
        // Check if the transaction exists
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        
        // Update transaction if different 
        for (const key of Object.keys(updates)) {
            if (transaction[key] !== updates[key]) {
                transaction[key] = updates[key];
            }
        }

        // Save the updated transaction
        await transaction.save();

        return res.status(200).json(transaction);
    } catch (error) {
        // Handle errors (e.g., database errors)
        return res.status(500).json({ error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    const { transactionId } = req.params; // Get transaction ID from request parameters

    try {
        // Find the transaction by ID and delete it
        const transaction = await Transaction.findByIdAndDelete(transactionId);
        
        // Check if the transaction was found and deleted
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Respond with a success message
        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        // Handle errors (e.g., database errors)
        return res.status(500).json({ error: error.message });
    }
};

const getUserTransaction  = async (req, res) => {
    const { userId } = req.params; // Get user ID from request parameters

    try {
        // Find all transactions for the specified user
        const transactions = await Transaction.find({ userId });

        // Check if transactions exist
        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this user." });
        }

        // Respond with the list of transactions
        return res.status(200).json(transactions);
    } catch (error) {
        // Handle errors (e.g., database errors)
        return res.status(500).json({ error: error.message });
    }
};


export {
    createTransaction,
    updateTransaction,
    deleteTransaction ,
    getUserTransaction  
};