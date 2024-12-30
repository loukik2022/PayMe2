import express from 'express';
import {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getUserTransaction
} from '../controllers/transactionController.js';
import { 
    checkMissingFields, 
    checkUserExists, 
    checkSubscriptionExists, 
    validateAmountStatus
} from '../middlewares/verifyTransaction.js';
import { checkToken, checkRole } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post('/create', [checkMissingFields, checkUserExists, checkSubscriptionExists, validateAmountStatus], createTransaction);
router.patch('/:transactionId', validateAmountStatus, updateTransaction);
router.delete('/:transactionId', deleteTransaction);

// admin
router.get('/:userId', [checkToken, checkRole('admin'), checkUserExists], getUserTransaction);

export default router;  