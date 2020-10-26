"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const mongoose_1 = require("mongoose");
const projections_1 = require("../projections");
const models_1 = require("../../models");
class UsersRepository {
    async save(payload) {
        return models_1.UserModule.create(payload);
    }
    async findById(id) {
        return models_1.UserModule.findById(id).lean();
    }
    async findByUserName(username) {
        return models_1.UserModule.findOne({ username }).lean();
    }
    async tokenPayload(username) {
        return models_1.UserModule.findOne({ username }, projections_1.Projections.Users.TokenPayload).lean();
    }
    async updateLogout(userId) {
        return models_1.UserModule.findByIdAndUpdate({ _id: new mongoose_1.Types.ObjectId(userId) }, { $set: { lastLogoutTime: new Date() } });
    }
    async findByEmail(email) {
        return models_1.UserModule.findOne({ email }).lean();
    }
    async update(id, payload) {
        return models_1.UserModule.updateOne({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: payload }).lean();
    }
    async getTokenPayload(id) {
        return models_1.UserModule.findById(id).select(projections_1.Projections.Users.TokenPayload).lean();
    }
    async isLoginEnabled(pid) {
        return models_1.UserModule.findOne({ _id: new mongoose_1.Types.ObjectId(pid), loginEnabled: true }).lean();
    }
    async getPrimaryUserByEntityId(entity) {
        return models_1.UserModule.findOne({ entity: new mongoose_1.Types.ObjectId(entity), isDefault: true }).lean();
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=user.js.map