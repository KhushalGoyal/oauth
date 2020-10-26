import { BaseEntity } from "../../helpers/entities"
import { UserTypes } from "../../../configs";

export class UserEntity extends BaseEntity {
    public pid: string;
    public active: boolean;
    public allowedClients: Array<string>;
    public loginEnabled: boolean;
    public verified: boolean;
    public username: string;
    public password: string;
    public email: string;
    /** Default User Type Is Member */
    public userType: UserTypes;
    public lastLoginTime: Date;
    public lastLogoutTime: Date;
}
