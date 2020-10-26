"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = exports.Authentication = void 0;
const helpers_1 = require("../../helpers");
const response_1 = require("../../../response");
const repository_1 = require("../repository");
const user_not_found = "Username or Email not found";
const user_is_not_loggedin = "User Is not Logged In";
const userRepository = new repository_1.UsersRepository();
async function Authentication(req, res, next) {
    try {
        const payload = req.body;
        const user = await userRepository.findByEmail(payload.username);
        if (!user)
            response_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, user_not_found, "user_not_found");
        if (user && helpers_1.PasswordHelper.compare(req.body.password, user.password)) {
            req.body.user = user;
            next();
        }
        else {
            response_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, "Invalid Password", "invalid_password");
        }
    }
    catch (err) {
        next(err);
    }
}
exports.Authentication = Authentication;
/**
 * Used at the time of authorization ( when user is already logged in with another client)
 * @param req - request payload
 * @param res - response handler
 * @param next - next middleware
 */
async function Authorization(req, res, next) {
    try {
        const body = req.body;
        const decode = helpers_1.BufferUtits.atob(body.user);
        const iamUser = await new repository_1.OauthRepository().isLoggedIn(decode);
        if (iamUser) {
            const payload = await userRepository.findById(decode);
            delete payload.password;
            req.body.user = payload;
            next();
        }
        else {
            res.status(response_1.StatusCodes.UNAUTHORIZED_ACCESS).send(new response_1.ErrorResponse(user_is_not_loggedin, response_1.ErrorCodes.login_failure));
        }
    }
    catch (err) {
        res.status(response_1.StatusCodes.UNAUTHORIZED_ACCESS).send(new response_1.ErrorResponse(err.message));
    }
}
exports.Authorization = Authorization;
//# sourceMappingURL=oauth.js.map