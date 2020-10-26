"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStaticService = exports.ClientService = void 0;
const uuid_1 = require("uuid");
const entities_1 = require("../../helpers/entities");
const base_1 = require("../../helpers/service/base");
const repository_1 = require("../../helpers/repository");
class ClientService extends base_1.AbstractService {
    constructor() {
        super(...arguments);
        this.clientRepository = new repository_1.ClientsRepository();
        this.create = async (body) => {
            const payload = Object.assign(new entities_1.ClientsEntity(), body);
            payload.clientSecret = uuid_1.v4();
            payload.clientId = uuid_1.v4();
            return this.clientRepository.save(payload);
        };
        this.getAll = async (query) => {
            const requestQuery = this.getQuery(query);
            return this.clientRepository.getAll(requestQuery.filter);
        };
    }
    async get(id) {
        return this.clientRepository.findById(id);
    }
}
exports.ClientService = ClientService;
class ClientStaticService {
    constructor() {
        this.clientRepository = new repository_1.ClientsRepository();
        this.create = async (body) => {
            const payload = Object.assign(new entities_1.ClientsEntity(), body);
            payload.clientSecret = uuid_1.v4();
            payload.clientId = uuid_1.v4();
            return this.clientRepository.save(payload);
        };
    }
}
exports.ClientStaticService = ClientStaticService;
//# sourceMappingURL=service.js.map