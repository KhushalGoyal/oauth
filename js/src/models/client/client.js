"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const configs_1 = require("../../../configs");
const ClientSchema = new mongoose_1.Schema({
    name: { type: String, index: true, required: true },
    type: { type: String, enum: [configs_1.ClientTypes.HOROSCOPE, configs_1.ClientTypes.DESERT_CO, configs_1.ClientTypes.PORTAL], default: configs_1.ClientTypes.HOROSCOPE, required: true },
    clientId: { type: String, index: true },
    clientSecret: { type: String, index: true },
    redirectUris: { type: Array, index: true },
    grants: { type: Array, index: true },
    userTypes: [{ type: String }],
});
ClientSchema.plugin(mongoose_paginate_v2_1.default);
exports.ClientsModel = mongoose_1.model('clients', ClientSchema);
//# sourceMappingURL=client.js.map