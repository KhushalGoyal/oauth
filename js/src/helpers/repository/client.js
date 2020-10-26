"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsRepository = void 0;
const models_1 = require("../../models");
class ClientsRepository {
    async save(payload) {
        return (await models_1.ClientsModel.create(payload)).toObject();
    }
    async findById(id) {
        return models_1.ClientsModel.findById(id).lean();
    }
    async pagination(filter, paginationOptions) {
        return models_1.ClientsModel.paginate(filter, paginationOptions);
    }
    async findByCredentials(payload) {
        return models_1.ClientsModel.findOne(payload).lean();
    }
    async getAll(filter) {
        return models_1.ClientsModel.find({}, { name: true, clientId: true }).lean();
    }
}
exports.ClientsRepository = ClientsRepository;
//# sourceMappingURL=client.js.map