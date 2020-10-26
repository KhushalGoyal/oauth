import { Router, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AccessService, AccessStaticService } from "./access-service";
import { StatusCodes, SuccessResponse, ErrorResponse } from "../../../response";
import { ClientValidations } from "../../helpers/validations";
import { AccessValidation } from "../../helpers/validations/access";

const AccessController: Router = Router();

AccessController.post("/static", AccessValidation.create(), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(errors));
            return;
        }
        const portalService: AccessStaticService = new AccessStaticService();
        response.status(StatusCodes.OK).send(new SuccessResponse(await portalService.create(request.body)));
    } catch (err) {
        next(err);
    }
});

export default AccessController;