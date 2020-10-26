import { UserTypes, AppException } from "../../configs";
import { TokensHelper } from "./token";
import { UserEntity } from "./entities";
import { StatusCodes, ErrorCodes } from "../../response";

/** Auth Guard Middleware */
export function AuthGuard(userType?: UserTypes): any {
    return (request: any, response: any, next: any) => {
        try {
            const access_token_missing = "Access Token Missing in Authorization Header";
            const unAuthorizedAccess = "Unauthorized access";
            const { authorization } = request.headers;
            if (!authorization || !authorization.split(" ")[1]) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, access_token_missing , ErrorCodes.access_token_missing);
            const token = authorization.split(" ")[1];
            const tokenPayload = TokensHelper.verifyToken<UserEntity>(token);
            if(userType && (userType !== tokenPayload.userType)) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, unAuthorizedAccess , ErrorCodes.invalid_user_type);
            response.locals.user = tokenPayload;
            next();
        } catch (error) {
            if(error.name == "TokenExpiredError"){
                error.statusCode = StatusCodes.UNAUTHORIZED_ACCESS;
                error.errorCode = ErrorCodes.token_expired;
            }
            next(error);
        }
    }
}

/** Common Open Api Guard for Open Endpoints */
export function OpenApiGuard(ApiKey:string) {
    if(!ApiKey) throw new Error("Api Key Is Required");
    return (request: any, response: any, next: any) => {
        try {
            const apiKey_missing = "Api Key Missing";
            const unAuthorizedAccess = "Unauthorized access";
            const xApiKey = request.headers["x-api-key"];
            if (!xApiKey) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, apiKey_missing , ErrorCodes.api_key_missing);
            if(xApiKey !== ApiKey) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, unAuthorizedAccess);
            next();
        } catch (error) {
            next(error);
        }
    } 
}