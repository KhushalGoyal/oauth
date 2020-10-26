import { Router } from "express";

import OauthController from "../src/models/oauth/oauth-service";
import ClientsController from "../src/models/client/controller";
import { AuthGuard } from "../src/helpers/authGuard";
import AccessController from "../src/models/access/controller";
import UserController from "../src/models/users/controller";

const AppController: Router = Router();
AppController.use("/oauth", OauthController);
// AppController.use("/public", PublicController);
AppController.use("/clients", AuthGuard() ,ClientsController);
AppController.use("/access", AccessController);
AppController.use("/user", UserController)

// AppController.use("/identity", AuthGuard(), IdentityController);
// AppController.use("/entities", EntityController);


export default AppController;
