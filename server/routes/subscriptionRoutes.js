import { Router } from 'express';
import { checkToken, checkRole } from "../middlewares/verifyAuth.js";
import { checkPlanMissingFields, checkSubscriptionExists } from "../middlewares/verifySubscription.js"
import {
    getAllSubscriptions,
    createSubscription, 
    updateSubscription,
    deleteSubscription
} from '../controllers/subscriptionController.js'; 

const router = Router();

router.get('/allSubscriptions', getAllSubscriptions);

// admin
router.post('/create', [checkPlanMissingFields, checkToken, checkRole('admin')], createSubscription);
router.patch('/:subscriptionId', [checkSubscriptionExists, checkToken, checkRole('admin')], updateSubscription);
router.delete('/:subscriptionId', [checkSubscriptionExists, checkToken, checkRole('admin')], deleteSubscription);


export default router;  