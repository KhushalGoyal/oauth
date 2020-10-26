"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientValidations = void 0;
const express_validator_1 = require("express-validator");
class ClientValidations {
    static create() {
        return [
            express_validator_1.body("name").notEmpty().withMessage("name is empty"),
            express_validator_1.body("type").notEmpty().withMessage("type is empty"),
            express_validator_1.body("redirectUris").notEmpty().withMessage("redirectUris is empty"),
        ];
    }
}
exports.ClientValidations = ClientValidations;
//# sourceMappingURL=client.js.map