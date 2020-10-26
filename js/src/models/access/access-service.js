"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessStaticService = exports.AccessService = void 0;
const base_1 = require("../../helpers/service/base");
const repository_1 = require("../../helpers/repository");
const access_1 = require("../../helpers/entities/access");
class AccessService extends base_1.AbstractService {
    constructor() {
        super(...arguments);
        this.accessRepository = new repository_1.AccessRepository();
        this.create = async (body) => {
            const payload = Object.assign(new access_1.AccessEntity(), body);
            return this.accessRepository.save(payload);
        };
        this.getAll = async (query) => {
            const requestQuery = this.getQuery(query);
            return this.accessRepository.getAll(requestQuery.filter);
        };
    }
    async get(id) {
        return this.accessRepository.findById(id);
    }
}
exports.AccessService = AccessService;
class AccessStaticService {
    constructor() {
        this.accessRepository = new repository_1.AccessRepository();
        this.create = async (body) => {
            const payload = Object.assign(new access_1.AccessEntity(), body);
            return this.accessRepository.save(payload);
        };
    }
}
exports.AccessStaticService = AccessStaticService;
//# sourceMappingURL=access-service.js.map