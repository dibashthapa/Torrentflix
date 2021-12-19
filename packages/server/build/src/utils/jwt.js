import { jwtExpiry, secretToken } from "../config";
import jwt from "jsonwebtoken";
export const createToken = async (credential) => {
    const { email, userId } = credential;
    const token = jwt.sign({
        sub: userId,
        email: email,
        id: userId,
    }, secretToken, { expiresIn: jwtExpiry });
    return token;
};
//# sourceMappingURL=jwt.js.map