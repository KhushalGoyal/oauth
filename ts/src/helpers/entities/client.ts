import { BaseEntity } from "./base";
import { ClientTypes } from "../../../configs";


export class ClientsEntity extends BaseEntity {
    name: string;
    type: ClientTypes;
    clientId: string;
    clientSecret: string;
    redirectUris: string | string[];
    grants: string[];
    userTypes: string[];
}
