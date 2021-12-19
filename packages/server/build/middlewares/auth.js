import { AuthFailureError, BadTokenError } from "../core/ApiError";
import jwt from "jsonwebtoken";
import { secretToken } from "../config";
export default (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
        throw new AuthFailureError();
    if (!authorization.includes("Bearer"))
        throw new AuthFailureError();
    const token = authorization.split(" ")[1];
    const isValid = jwt.verify(token, secretToken);
    if (!isValid)
        throw new BadTokenError();
    const payload = jwt.decode(token);
    res.locals.user = { email: payload.email, id: payload.id };
    return next();
};
//# sourceMappingURL=auth.js.map