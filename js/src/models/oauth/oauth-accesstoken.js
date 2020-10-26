"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthAccessTokenModel = void 0;
const mongoose_1 = require("mongoose");
const OAuthAccessTokenSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'users', index: true },
    client: { type: mongoose_1.Types.ObjectId, ref: 'clients', index: true },
    accessToken: { type: String, index: true },
    accessTokenExpiresAt: { type: Date, index: true },
    refreshToken: { type: String, index: true },
    refreshTokenExpiresAt: { type: Date, index: true },
    scope: { type: String, index: true },
}, { timestamps: true });
exports.OAuthAccessTokenModel = mongoose_1.model("oauth_access_tokens", OAuthAccessTokenSchema);
//# sourceMappingURL=oauth-accesstoken.js.map