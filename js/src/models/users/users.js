"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const mongoose_1 = require("mongoose");
const UsersSchema = new mongoose_1.Schema({
    /** optional if required in payload set profileId as pid */
    pid: { type: mongoose_1.Types.ObjectId, index: true },
    userType: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true, index: true },
    lastLoginTime: { type: Date },
    lastLogoutTime: { type: Date },
    active: { type: Boolean },
    allowedClients: { type: Array },
    loginEnabled: { type: Boolean },
    verified: { type: Boolean },
}, { timestamps: true });
UsersSchema.index({ createdAt: 1 });
UsersSchema.index({ updatedAt: 1 });
exports.UserModule = mongoose_1.model('users', UsersSchema);
//# sourceMappingURL=users.js.map