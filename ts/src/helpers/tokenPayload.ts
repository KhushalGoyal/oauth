import { UserEntity } from "./entities";


export class BaseTokenPayload extends UserEntity {
    scope: string;
}

export class EntityTokenPayload extends BaseTokenPayload {
    role: string;
}