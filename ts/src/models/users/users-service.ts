import { UserTypes } from "../../../configs";
import { UserEntity } from "../../helpers/entities";
import { PasswordHelper } from "../../helpers";
import { UserModule } from "./users";


export default class UserHelper {
    public async register(payload : UserEntity): Promise<UserEntity> {
        const userEntity = new UserEntity();
        if (payload.id) userEntity._id = payload.id;
        userEntity.username = payload.username;
        userEntity.pid = payload.pid;
        userEntity.userType = payload.userType;
        userEntity.email = payload.email;
        userEntity.loginEnabled = true;
        userEntity.allowedClients = payload.allowedClients;
        if (!payload.password) {
            const password = PasswordHelper.createPassword();
            console.log("Password", password);
            userEntity.password = PasswordHelper.encrypt(password);
        } else {
            userEntity.password = PasswordHelper.encrypt(payload.password);
        }
        return UserModule.create(userEntity);
    }
}
