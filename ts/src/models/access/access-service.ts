import { AbstractService } from "../../helpers/service/base";
import { AccessRepository } from "../../helpers/repository";
import { RequestQuery } from "../../helpers/service/requestQuery";
import { AccessEntity } from '../../helpers/entities/access';

export class AccessService extends AbstractService<AccessEntity> {
    accessRepository = new AccessRepository();
    public create = async (body: AccessEntity): Promise<AccessEntity> => {
        const payload: AccessEntity = Object.assign(new AccessEntity(), body);
        return this.accessRepository.save(payload);
    }

    public async get(id: string): Promise<AccessEntity> {
        return this.accessRepository.findById(id);
    }

    public getAll = async (query: RequestQuery<AccessEntity>): Promise<any> => {
        const requestQuery = this.getQuery(query);
        return this.accessRepository.getAll(requestQuery.filter);
    }
}

export class AccessStaticService {
    accessRepository = new AccessRepository();
    public create = async (body: AccessEntity): Promise<AccessEntity> => {
        const payload: AccessEntity = Object.assign(new AccessEntity(), body);
        return this.accessRepository.save(payload);
    }
}
