"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = exports.AuthenticationV2 = exports.Authentication = void 0;
const express_validator_1 = require("express-validator");
// import { PasswordHelper } from "../helpers";
const authRequest_1 = require("../configs/authRequest");
const ejsRenderer_1 = require("../configs/ejsRenderer");
const user_not_found = "Username or Email not found";
const login_not_enabled = "Login Not Enabled, Ask your admin to grant login permissions";
/**
 * Used at the time of authenticate
 * @param req - request payload
 * @param res - response handler
 * @param next - next middleware
 */
async function Authentication(req, res, next) {
    try {
        const validationErrors = express_validator_1.validationResult(req);
        if (!validationErrors.isEmpty()) {
            const renderer = new ejsRenderer_1.EJSRenderer();
            renderer.validationErrors = validationErrors.array();
            renderer.form = Object.assign(new authRequest_1.BaseAuthRequest(), req.body);
            res.locals = renderer;
            res.render("authenticate");
        }
        else {
            const payload = req.body;
            // const user = await IamUserModel.findOne({ username: payload.username });
            // if (!user) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, user_not_found, "user_not_found");
            // const userData = user.toObject() as IamUserEntity;
            // if (user && PasswordHelper.compare(req.body.password, userData.password)) {
            //     if (!userData.loginEnabled) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, login_not_enabled, "login_not_enabled");
            //     delete userData.password;
            //     req.body.user = userData;
            //     next();
            // } else {
            //     AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, "Invalid Password", "invalid_password");
            // }
        }
    }
    catch (err) {
        // errorLogger(err, req.url);
        // const renderer = new EJSRenderer<BaseAuthRequest>();
        // renderer.validationErrors = null;
        // renderer.backendErrors = err.error_description ? err.error_description : err.message;
        // renderer.form = Object.assign(new BaseAuthRequest(), req.body);
        // if (req.body.client_id === memberPortalId) res.locals.showSignup = true;
        // res.locals = renderer;
        // res.render("authenticate");
    }
}
exports.Authentication = Authentication;
async function AuthenticationV2(req, res, next) {
    try {
        const validationErrors = express_validator_1.validationResult(req);
        // if (!validationErrors.isEmpty()) {
        //     res.status(StatusCodes.BAD_REQUEST).send(new ErrorResponse(validationErrors.array()));
        // } else {
        //     const payload = req.body as BaseAuthRequest;
        //     const user = await IamUserModel.findOne({ username: payload.username });
        //     if (!user) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, user_not_found, "user_not_found");
        //     const userData = user.toObject() as IamUserEntity;
        //     if (user && PasswordHelper.compare(req.body.password, userData.password)) {
        //         if (!userData.loginEnabled) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, login_not_enabled, "login_not_enabled");
        //         delete userData.password;
        //         req.body.user = userData;
        //         next();
        //     } else {
        //         AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, "Invalid Password", "invalid_password");
        //     }
        // }
    }
    catch (err) {
        next(err);
    }
}
exports.AuthenticationV2 = AuthenticationV2;
/**
 * Used at the time of authorization ( when user is already logged in with another client)
 * @param req - request payload
 * @param res - response handler
 * @param next - next middleware
 */
async function Authorization(req, res, next) {
    try {
        // const user = await IamUserModel.findById(req.cookies.user);
        // const userData = user.toObject() as IamUserEntity;
        // delete userData.password;
        // req.body.user = userData;
        next();
    }
    catch (err) {
        // res.status(401).send(new ErrorResponse(err.message));
    }
}
exports.Authorization = Authorization;
//# sourceMappingURL=oauth.js.map