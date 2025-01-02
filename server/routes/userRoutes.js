import { Router } from 'express';
import { User } from "../models/user.js";
import { signup, signin, signout, refreshToken } from "../controllers/authController.js";
import { 
    checkToken, 
    checkRole, 
    checkDuplicateUserOrEmailExist, 
    checkRoleExist 
} from "../middlewares/verifyAuth.js";

const router = Router();

router.post("/signup", [checkDuplicateUserOrEmailExist, checkRoleExist], signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/refreshToken", checkToken, refreshToken);

// admin
router.get("/allUser", [checkToken, checkRole(["admin"])], async (req, res) => {
    const users = await User.find().select("-password"); // Exclude the password field
    res.status(200).send(users);
});

export default router;