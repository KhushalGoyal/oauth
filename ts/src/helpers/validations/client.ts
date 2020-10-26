import { body, ValidationChain } from "express-validator";

export class ClientValidations {
    static create(): ValidationChain[] {
        return [
            body("name").notEmpty().withMessage("name is empty"),
            body("type").notEmpty().withMessage("type is empty"),
            body("redirectUris").notEmpty().withMessage("redirectUris is empty"),
        ];
    }
}
