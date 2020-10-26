"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oauth_service_1 = __importDefault(require("../src/models/oauth/oauth-service"));
const controller_1 = __importDefault(require("../src/models/client/controller"));
const authGuard_1 = require("../src/helpers/authGuard");
const controller_2 = __importDefault(require("../src/models/access/controller"));
const controller_3 = __importDefault(require("../src/models/users/controller"));
const AppController = express_1.Router();
AppController.use("/oauth", oauth_service_1.default);
// AppController.use("/public", PublicController);
AppController.use("/clients", authGuard_1.AuthGuard(), controller_1.default);
AppController.use("/access", controller_2.default);
AppController.use("/user", controller_3.default);
// AppController.use("/identity", AuthGuard(), IdentityController);
// AppController.use("/entities", EntityController);
exports.default = AppController;
//# sourceMappingURL=app.js.map