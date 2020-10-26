import { Types } from "mongoose";
import { Access } from "../../models/access/access-config";
import { AccessModule } from "../../models/access/access";
import { AccessEntity } from "../entities/access";
import { PaginateOptions, PaginateResult } from "mongoose";

export class AccessRepository {
    async save(payload: AccessEntity): Promise<AccessEntity> {
        return (await AccessModule.create(payload)).toObject();
    }
    async findById(id: string): Promise<AccessEntity> {
        return AccessModule.findById(id).lean() as any;
    }
    async pagination(filter: AccessEntity, paginationOptions: PaginateOptions): Promise<PaginateResult<any>> {
        return AccessModule.paginate(filter, paginationOptions);
    }
    async findByCredentials(payload: AccessEntity): Promise<AccessEntity> {
        return AccessModule.findOne(payload).lean() as any;
    }
    async getAll(filter: AccessEntity): Promise<AccessEntity[]> {
        return AccessModule.find(filter, { name: true, clientId: true }).lean() as any;
    }
    static async checkPortalAccess(userType, clientId): Promise<Access> {
        console.log(userType, clientId)
        return AccessModule.findOne({ clientId: new Types.ObjectId(clientId), role: userType }).lean() as any;
    }
}