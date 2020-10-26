import { v4 as uuid } from "uuid";
import { ClientsEntity } from "../../helpers/entities";
import { AbstractService } from "../../helpers/service/base";
import { ClientsRepository } from "../../helpers/repository";
import { RequestQuery } from "../../helpers/service/requestQuery";

export class ClientService extends AbstractService<ClientsEntity> {
    clientRepository = new ClientsRepository();
    public create = async (body: ClientsEntity): Promise<ClientsEntity> => {
        const payload: ClientsEntity = Object.assign(new ClientsEntity(), body);
        payload.clientSecret = uuid();
        payload.clientId = uuid();
        return this.clientRepository.save(payload);
    }

    public async get(id: string): Promise<ClientsEntity> {
        return this.clientRepository.findById(id);
    }

    public getAll = async (query: RequestQuery<ClientsEntity>): Promise<any> => {
        const requestQuery = this.getQuery(query);
        return this.clientRepository.getAll(requestQuery.filter);
    }
}


export class ClientStaticService {
    clientRepository = new ClientsRepository();
    public create = async (body: ClientsEntity): Promise<ClientsEntity> => {
        const payload: ClientsEntity = Object.assign(new ClientsEntity(), body);
        payload.clientSecret = uuid();
        payload.clientId = uuid();
        return this.clientRepository.save(payload);
    }
}
