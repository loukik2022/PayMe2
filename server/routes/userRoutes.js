import { Router } from 'express';
import { signup, signin, signout, refreshToken } from "../controllers/authController.js";
import { checkUserOrEmailExist, checkRoleExist } from "../middlewares/verifySignUp.js";
import { checkToken, checkRole } from "../middlewares/verifyJWT.js";
import { User } from "../models/user.js";

const router = Router();

router.post("/signup", [checkUserOrEmailExist, checkRoleExist], signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/refreshToken", refreshToken);

router.get("/allUser", [checkToken, checkRole(["admin"])], async (req, res) => {
    const users = await User.find().select("-password"); // Exclude the password field
    res.status(200).send(users);
});

export default router;