"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const oauth2_server_1 = __importDefault(require("oauth2-server"));
const helpers_1 = require("../../helpers");
const envConfig_1 = require("./../../../configs/envConfig");
const { accessTokenLifeTime, authCodeLifeTime, refreshTokenLifeTime } = envConfig_1.envConfig.application.oauth;
exports.oauth = new oauth2_server_1.default({
    model: helpers_1.OauthImpl,
    allowEmptyState: true,
    authorizationCodeLifetime: authCodeLifeTime,
    authenticateHandler: { handle: (reqs) => reqs.body.user },
    accessTokenLifetime: accessTokenLifeTime,
    refreshTokenLifetime: refreshTokenLifeTime,
    requireClientAuthentication: { authorization_code: true, refresh_token: true },
});
//# sourceMappingURL=oauth-config.js.map