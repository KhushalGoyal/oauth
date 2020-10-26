"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const express_validator_1 = require("express-validator");
class UserValidations {
    static create() {
        return [
            express_validator_1.body("username").notEmpty().withMessage("username is empty"),
            express_validator_1.body("email").isEmail().withMessage("email is empty"),
            express_validator_1.body("password").notEmpty().withMessage("password is empty")
        ];
    }
}
exports.UserValidations = UserValidations;
//# sourceMappingURL=user.js.map