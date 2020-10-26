"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../../helpers/entities");
const helpers_1 = require("../../helpers");
const users_1 = require("./users");
class UserHelper {
    async register(payload) {
        const userEntity = new entities_1.UserEntity();
        if (payload.id)
            userEntity._id = payload.id;
        userEntity.username = payload.username;
        userEntity.pid = payload.pid;
        userEntity.userType = payload.userType;
        userEntity.email = payload.email;
        userEntity.loginEnabled = true;
        userEntity.allowedClients = payload.allowedClients;
        if (!payload.password) {
            const password = helpers_1.PasswordHelper.createPassword();
            console.log("Password", password);
            userEntity.password = helpers_1.PasswordHelper.encrypt(password);
        }
        else {
            userEntity.password = helpers_1.PasswordHelper.encrypt(payload.password);
        }
        return users_1.UserModule.create(userEntity);
    }
}
exports.default = UserHelper;
//# sourceMappingURL=users-service.js.map