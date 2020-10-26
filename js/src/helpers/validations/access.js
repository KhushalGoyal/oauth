"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessValidation = void 0;
const express_validator_1 = require("express-validator");
class AccessValidation {
    static create() {
        return [
            express_validator_1.body("name").notEmpty().withMessage("name is empty"),
            express_validator_1.body("type").notEmpty().withMessage("type is empty"),
            express_validator_1.body("clientId").notEmpty().withMessage("clientid is empty"),
            express_validator_1.body("role").notEmpty().withMessage("role is empty"),
            express_validator_1.body("modules").isArray().withMessage("modules is empty")
        ];
    }
}
exports.AccessValidation = AccessValidation;
//# sourceMappingURL=access.js.map