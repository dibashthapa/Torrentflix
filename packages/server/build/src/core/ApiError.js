import { AuthFailureResponse, AccessTokenErrorResponse, InternalErrorResponse, NotFoundResponse, BadRequestResponse, ForbiddenResponse, } from "./ApiResponse";
var ErrorType;
(function (ErrorType) {
    ErrorType["BAD_TOKEN"] = "BadTokenError";
    ErrorType["TOKEN_EXPIRED"] = "TokenExpiredError";
    ErrorType["UNAUTHORIZED"] = "AuthFailureError";
    ErrorType["ACCESS_TOKEN"] = "AccessTokenError";
    ErrorType["INTERNAL"] = "InternalError";
    ErrorType["NOT_FOUND"] = "NotFoundError";
    ErrorType["NO_ENTRY"] = "NoEntryError";
    ErrorType["NO_DATA"] = "NoDataError";
    ErrorType["BAD_REQUEST"] = "BadRequestError";
    ErrorType["FORBIDDEN"] = "ForbiddenError";
})(ErrorType || (ErrorType = {}));
export class ApiError extends Error {
    constructor(type, message = "error") {
        super(type);
        this.type = type;
        this.message = message;
    }
    static handle(err, res) {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.ACCESS_TOKEN:
                return new AccessTokenErrorResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse(err.message).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse(err.message).send(res);
            default: {
                let message = err.message;
                return new InternalErrorResponse(message).send(res);
            }
        }
    }
}
export class AuthFailureError extends ApiError {
    constructor(message = "Invalid Credentials") {
        super(ErrorType.UNAUTHORIZED, message);
    }
}
export class InternalError extends ApiError {
    constructor(message = "Internal error") {
        super(ErrorType.INTERNAL, message);
    }
}
export class BadRequestError extends ApiError {
    constructor(message = "Bad Request") {
        super(ErrorType.BAD_REQUEST, message);
    }
}
export class NotFoundError extends ApiError {
    constructor(message = "Not Found") {
        super(ErrorType.NOT_FOUND, message);
    }
}
export class ForbiddenError extends ApiError {
    constructor(message = "Permission denied") {
        super(ErrorType.FORBIDDEN, message);
    }
}
export class NoEntryError extends ApiError {
    constructor(message = "Entry don't exists") {
        super(ErrorType.NO_ENTRY, message);
    }
}
export class BadTokenError extends ApiError {
    constructor(message = "Token is not valid") {
        super(ErrorType.BAD_TOKEN, message);
    }
}
export class TokenExpiredError extends ApiError {
    constructor(message = "Token is expired") {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}
export class NoDataError extends ApiError {
    constructor(message = "No data available") {
        super(ErrorType.NO_DATA, message);
    }
}
export class AccessTokenError extends ApiError {
    constructor(message = "Invalid access token") {
        super(ErrorType.ACCESS_TOKEN, message);
    }
}
//# sourceMappingURL=ApiError.js.map