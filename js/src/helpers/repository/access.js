"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRepository = void 0;
const mongoose_1 = require("mongoose");
const access_1 = require("../../models/access/access");
class AccessRepository {
    async save(payload) {
        return (await access_1.AccessModule.create(payload)).toObject();
    }
    async findById(id) {
        return access_1.AccessModule.findById(id).lean();
    }
    async pagination(filter, paginationOptions) {
        return access_1.AccessModule.paginate(filter, paginationOptions);
    }
    async findByCredentials(payload) {
        return access_1.AccessModule.findOne(payload).lean();
    }
    async getAll(filter) {
        return access_1.AccessModule.find(filter, { name: true, clientId: true }).lean();
    }
    static async checkPortalAccess(userType, clientId) {
        console.log(userType, clientId);
        return access_1.AccessModule.findOne({ clientId: new mongoose_1.Types.ObjectId(clientId), role: userType }).lean();
    }
}
exports.AccessRepository = AccessRepository;
//# sourceMappingURL=access.js.map