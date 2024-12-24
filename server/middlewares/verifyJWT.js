import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

/*
To process Authentication & Authorization, we create following functions:
- check if token is provided, legal or not. 
    Extract token from HTTP headers `authorization`, 
    then use jsonwebtoken's verify() function
- check if roles of the user contains required role or not
*/

const checkToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); // Remove "Bearer " from the string
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};


const checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            if (roles.includes(user.role)) {
                next();
            } else {
                res.status(403).send({ message: `Role must be ${roles.join(", ")}` });
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
};

export { checkToken, checkRole };