import { BaseEntity } from "./base";
import { UserTypes, ClientTypes } from "../../../configs";


export class AccessEntity extends BaseEntity {
    name: string;
    type: ClientTypes;
    clientId: string;
    role: UserTypes;
    modules: [{
        name : string,
        code : string,
        isEnable : boolean,
        services : [{
            name : string,
            code : string,
            access : {
                canread : boolean,
                canwrite : boolean,
                canupdate : boolean
            }
        }]
    }];
}