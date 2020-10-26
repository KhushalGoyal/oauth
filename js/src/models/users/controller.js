"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const response_1 = require("../../../response");
const user_1 = require("../../helpers/validations/user");
const users_service_1 = __importDefault(require("./users-service"));
const UserController = express_1.Router();
UserController.post("/", user_1.UserValidations.create(), async (request, response, next) => {
    try {
        const errors = express_validator_1.validationResult(request);
        if (!errors.isEmpty()) {
            response.status(response_1.StatusCodes.UNPROCESSED_ENTITY).send(new response_1.ErrorResponse(errors));
            return;
        }
        const portalService = new users_service_1.default();
        response.status(response_1.StatusCodes.OK).send(new response_1.SuccessResponse(await portalService.register(request.body)));
    }
    catch (err) {
        next(err);
    }
});
exports.default = UserController;
//# sourceMappingURL=controller.js.map