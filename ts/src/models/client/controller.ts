import { Router, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ClientService, ClientStaticService } from "./service";
import { StatusCodes, SuccessResponse, ErrorResponse } from "../../../response";
import { ClientValidations } from "../../helpers/validations";

const ClientsController: Router = Router();

ClientsController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const portalService: ClientService = new ClientService(response.locals.user);
        response.status(StatusCodes.OK).send(new SuccessResponse([]));
    } catch (err) {
        next(err);
    }
});


ClientsController.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const portalService: ClientService = new ClientService(response.locals.user);
        if (!request.params.id) throw new Error("Portal Id Missing");
        response.status(StatusCodes.OK).send(new SuccessResponse(await portalService.get(request.params.id)));
    } catch (err) {
        next(err);
    }
});

ClientsController.post("/", ClientValidations.create(), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(errors));
            return;
        }
        const portalService: ClientService = new ClientService(response.locals.user);
        response.status(StatusCodes.OK).send(new SuccessResponse(await portalService.create(request.body)));
    } catch (err) {
        next(err);
    }
});

ClientsController.post("/static", ClientValidations.create(), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(errors));
            return;
        }
        const portalService: ClientStaticService = new ClientStaticService();
        response.status(StatusCodes.OK).send(new SuccessResponse(await portalService.create(request.body)));
    } catch (err) {
        next(err);
    }
});

export default ClientsController;
