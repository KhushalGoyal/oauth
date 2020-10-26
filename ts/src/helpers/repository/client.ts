import { PaginateOptions, PaginateResult } from "mongoose";
import { ClientsEntity } from "../entities";
import { ClientsModel } from "../../models";

export class ClientsRepository {
    async save(payload: ClientsEntity): Promise<ClientsEntity> {
        return (await ClientsModel.create(payload)).toObject();
    }
    async findById(id: string): Promise<ClientsEntity> {
        return ClientsModel.findById(id).lean() as any;
    }
    async pagination(filter: ClientsEntity, paginationOptions: PaginateOptions): Promise<PaginateResult<any>> {
        return ClientsModel.paginate(filter, paginationOptions);
    }
    async findByCredentials(payload: ClientsEntity): Promise<ClientsEntity> {
        return ClientsModel.findOne(payload).lean() as any;
    }
    async getAll(filter: ClientsEntity): Promise<ClientsEntity[]> {
        return ClientsModel.find({}, { name: true, clientId: true }).lean() as any;
    }
}