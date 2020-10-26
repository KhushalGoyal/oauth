import { StatusCodes, ErrorResponse, ErrorCodes } from "../../response";
import { validationResult } from "express-validator";

export function validatePayload(request: any, response: any, next: any){
    const error = validationResult(request);
    if(!error.isEmpty()){
        const mappedError = error.array().map((el) => ({ key: el.param, message: el.msg, value: el.value }));
        response.status(StatusCodes.BAD_REQUEST).send(new ErrorResponse(mappedError, ErrorCodes.validation_error));
        return;
    } else {
        next();
    }
}
