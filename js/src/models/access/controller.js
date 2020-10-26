"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const access_service_1 = require("./access-service");
const response_1 = require("../../../response");
const access_1 = require("../../helpers/validations/access");
const AccessController = express_1.Router();
AccessController.post("/static", access_1.AccessValidation.create(), async (request, response, next) => {
    try {
        const errors = express_validator_1.validationResult(request);
        if (!errors.isEmpty()) {
            response.status(response_1.StatusCodes.UNPROCESSED_ENTITY).send(new response_1.ErrorResponse(errors));
            return;
        }
        const portalService = new access_service_1.AccessStaticService();
        response.status(response_1.StatusCodes.OK).send(new response_1.SuccessResponse(await portalService.create(request.body)));
    }
    catch (err) {
        next(err);
    }
});
exports.default = AccessController;
//# sourceMappingURL=controller.js.map