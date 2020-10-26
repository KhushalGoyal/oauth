"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessModule = void 0;
const mongoose_1 = require("mongoose");
const configs_1 = require("../../../configs");
const AccessModuleSchema = new mongoose_1.Schema({
    name: { type: String, index: true },
    type: { type: String, index: true },
    clientId: { type: mongoose_1.Types.ObjectId, index: true },
    role: { type: String, enum: [configs_1.UserTypes.SUPER_ADMIN, configs_1.UserTypes.ADMIN, configs_1.UserTypes.USER], default: configs_1.UserTypes.USER, index: true },
    modules: [{
            name: String,
            code: String,
            isEnable: Boolean,
            services: [{
                    name: String,
                    code: String,
                    access: {
                        canread: Boolean,
                        canwrite: Boolean,
                        canupdate: Boolean
                    }
                }]
        }]
}, { timestamps: true });
exports.AccessModule = mongoose_1.model("access", AccessModuleSchema);
//# sourceMappingURL=access.js.map