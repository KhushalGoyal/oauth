"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthCodeModel = void 0;
const mongoose_1 = require("mongoose");
const OAuthCodesSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'users', index: true },
    client: { type: mongoose_1.Types.ObjectId, ref: 'clients', index: true },
    authorizationCode: { type: String, index: true },
    expiresAt: { type: Date, index: true },
    scope: { type: String, index: true },
}, { timestamps: true });
exports.OAuthCodeModel = mongoose_1.model("oauth_codes", OAuthCodesSchema);
//# sourceMappingURL=oauth-code.js.map