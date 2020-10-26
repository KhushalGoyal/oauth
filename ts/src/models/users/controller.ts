import { Router, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCodes, SuccessResponse, ErrorResponse } from "../../../response";
import { UserValidations } from "../../helpers/validations/user";
import UserHelper from "./users-service";

const UserController: Router = Router();

UserController.post("/", UserValidations.create(), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(errors));
            return;
        }
        const portalService: UserHelper = new UserHelper();
        response.status(StatusCodes.OK).send(new SuccessResponse(await portalService.register(request.body)));
    } catch (err) {
        next(err);
    }
});

export default UserController;