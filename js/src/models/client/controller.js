"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const service_1 = require("./service");
const response_1 = require("../../../response");
const validations_1 = require("../../helpers/validations");
const ClientsController = express_1.Router();
ClientsController.get("/", async (request, response, next) => {
    try {
        const portalService = new service_1.ClientService(response.locals.user);
        response.status(response_1.StatusCodes.OK).send(new response_1.SuccessResponse([]));
    }
    catch (err) {
        next(err);
    }
});
ClientsController.get("/:id", async (request, response, next) => {
    try {
        const portalService = new service_1.ClientService(response.locals.user);
        if (!request.params.id)
            throw new Error("Portal Id Missing");
        response.status(response_1.StatusCodes.OK).send(new response_1.SuccessResponse(await portalService.get(request.params.id)));
    }
    catch (err) {
        next(err);
    }
});
ClientsController.post("/", validations_1.ClientValidations.create(), async (request, response, next) => {
    try {
        const errors = express_validator_1.validationResult(request);
        if (!errors.isEmpty()) {
            response.status(response_1.StatusCodes.UNPROCESSED_ENTITY).send(new response_1.ErrorResponse(errors));
            return;
        }
        const portalService = new service_1.ClientService(response.locals.user);
        response.status(response_1.StatusCodes.OK).send(new response_1.SuccessResponse(await portalService.create(request.body)));
    }
    catch (err) {
        next(err);
    }
});
ClientsController.post("/static", validations_1.ClientValidations.create(), async (request, response, next) => {
    try {
        const errors = express_validator_1.validationResult(request);
        if (!errors.isEmpty()) {
            response.status(response_1.StatusCodes.UNPROCESSED_ENTITY).send(new response_1.ErrorResponse(errors));
            return;
        }
        const portalService = new service_1.ClientStaticService();
        response.status(response_1.StatusCodes.OK).send(new response_1.SuccessResponse(await portalService.create(request.body)));
    }
    catch (err) {
        next(err);
    }
});
exports.default = ClientsController;
//# sourceMappingURL=controller.js.map