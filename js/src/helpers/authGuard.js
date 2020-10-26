"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiGuard = exports.AuthGuard = void 0;
const configs_1 = require("../../configs");
const token_1 = require("./token");
const response_1 = require("../../response");
/** Auth Guard Middleware */
function AuthGuard(userType) {
    return (request, response, next) => {
        try {
            const access_token_missing = "Access Token Missing in Authorization Header";
            const unAuthorizedAccess = "Unauthorized access";
            const { authorization } = request.headers;
            if (!authorization || !authorization.split(" ")[1])
                configs_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, access_token_missing, response_1.ErrorCodes.access_token_missing);
            const token = authorization.split(" ")[1];
            const tokenPayload = token_1.TokensHelper.verifyToken(token);
            if (userType && (userType !== tokenPayload.userType))
                configs_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, unAuthorizedAccess, response_1.ErrorCodes.invalid_user_type);
            response.locals.user = tokenPayload;
            next();
        }
        catch (error) {
            if (error.name == "TokenExpiredError") {
                error.statusCode = response_1.StatusCodes.UNAUTHORIZED_ACCESS;
                error.errorCode = response_1.ErrorCodes.token_expired;
            }
            next(error);
        }
    };
}
exports.AuthGuard = AuthGuard;
/** Common Open Api Guard for Open Endpoints */
function OpenApiGuard(ApiKey) {
    if (!ApiKey)
        throw new Error("Api Key Is Required");
    return (request, response, next) => {
        try {
            const apiKey_missing = "Api Key Missing";
            const unAuthorizedAccess = "Unauthorized access";
            const xApiKey = request.headers["x-api-key"];
            if (!xApiKey)
                configs_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, apiKey_missing, response_1.ErrorCodes.api_key_missing);
            if (xApiKey !== ApiKey)
                configs_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, unAuthorizedAccess);
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
exports.OpenApiGuard = OpenApiGuard;
//# sourceMappingURL=authGuard.js.map