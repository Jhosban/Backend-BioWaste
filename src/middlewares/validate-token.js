import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const authRequired = (require, response, next) => {
    try {
        const { token } = require.cookies;

        if (!token)
            return response.status(401).json({ message: "No token, authorization denied" });

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) {
                return response.status(401).json({ message: "Token is not valid" });
            }
            require.user = user;
            next();
        });
    } catch (err) {
        return response.status(500).json({ message: err.message });
    }
}