import { body, ValidationChain } from "express-validator";

export class AccessValidation {
    static create(): ValidationChain[] {
        return [
            body("name").notEmpty().withMessage("name is empty"),
            body("type").notEmpty().withMessage("type is empty"),
            body("clientId").notEmpty().withMessage("clientid is empty"),
            body("role").notEmpty().withMessage("role is empty"),
            body("modules").isArray().withMessage("modules is empty")
        ];
    }
}
