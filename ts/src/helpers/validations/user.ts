import { body, ValidationChain } from "express-validator";

export class UserValidations {
    static create(): ValidationChain[] {
        return [
            body("username").notEmpty().withMessage("username is empty"),
            body("email").isEmail().withMessage("email is empty"),
            body("password").notEmpty().withMessage("password is empty")
        ];
    }
}
