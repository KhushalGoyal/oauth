"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayload = void 0;
const response_1 = require("../../response");
const express_validator_1 = require("express-validator");
function validatePayload(request, response, next) {
    const error = express_validator_1.validationResult(request);
    if (!error.isEmpty()) {
        const mappedError = error.array().map((el) => ({ key: el.param, message: el.msg, value: el.value }));
        response.status(response_1.StatusCodes.BAD_REQUEST).send(new response_1.ErrorResponse(mappedError, response_1.ErrorCodes.validation_error));
        return;
    }
    else {
        next();
    }
}
exports.validatePayload = validatePayload;
//# sourceMappingURL=validatePayload.js.map