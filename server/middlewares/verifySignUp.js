import { User } from "../models/user.js";

/*
To verify a Signup action, we need 2 functions:
– check duplications for username and email
– check if roles in the request is legal or not
*/

const allowedRoles = ['admin', 'user']

const checkDuplicateUserOrEmailExist = async (req, res, next) => {
    try {
        // Check Username
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }

        // Check Email
        user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const checkRoleExist = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!allowedRoles.includes(req.body.roles[i])) {
                return res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
            }
        }
    }

    next();
};

export { checkDuplicateUserOrEmailExist, checkRoleExist };