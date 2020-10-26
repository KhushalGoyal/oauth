"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OauthImpl = exports.OauthModel = void 0;
const envConfig_1 = require("../../configs/envConfig");
const password_1 = require("./password");
const repository_1 = require("./repository");
const tokenPayload_1 = require("./tokenPayload");
const configs_1 = require("../../configs");
const token_1 = require("./token");
const response_1 = require("../../response");
const repository_2 = require("./repository");
const { accessTokenLifeTime } = envConfig_1.envConfig.application.oauth;
class OauthModel {
    constructor() {
        this.userRepository = new repository_1.UsersRepository();
        this.oauthRepository = new repository_1.OauthRepository();
        this.getClient = (clientId, clientSecret) => {
            const clientRepository = new repository_2.ClientsRepository();
            const params = { clientId };
            if (clientSecret) {
                params.clientSecret = clientSecret;
            }
            return clientRepository.findByCredentials(params);
        };
    }
    generateJWT(payload, client) {
        return token_1.TokensHelper.generateToken({ ...payload }, {
            expiresIn: accessTokenLifeTime,
            audience: client.clientId,
            issuer: envConfig_1.envConfig.server.baseUrl,
        });
    }
    async generateAccessToken(client, user, scope) {
        let payload;
        delete user.password;
        if (!client.userTypes.includes(user.userType))
            configs_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, `User Not Granted Access For ${client.name}`, response_1.ErrorCodes.invalid_user_type);
        const entityUser = await this.userRepository.getTokenPayload(user._id);
        payload = Object.assign(new tokenPayload_1.EntityTokenPayload(), { ...user, ...{ userType: entityUser.userType } });
        payload.scope = client.clientId;
        return this.generateJWT(payload, client);
    }
    async getAccessToken(accessToken) {
        const _accessToken = await this.oauthRepository.findTokenByAccessToken(accessToken);
        if (!_accessToken) {
            return false;
        }
        const _userAccessToken = _accessToken.toObject();
        if (!_userAccessToken.user) {
            _userAccessToken.user = {};
        }
        return _userAccessToken;
    }
    async getRefreshToken(refreshToken) {
        return this.oauthRepository.findTokenByRefreshToken(refreshToken);
    }
    getAuthorizationCode(code) {
        return this.oauthRepository.getAuthCodePayload(code);
    }
    async getUser(username, password) {
        const userRepository = new repository_1.UsersRepository();
        const user = await userRepository.tokenPayload(username);
        if (user && user.password && password_1.PasswordHelper.compare(password, user.password)) {
            delete user.password;
            return user;
        }
        return false;
    }
    async saveToken(token, client, user) {
        const accessToken = await this.oauthRepository.saveToken({
            user: user._id || null,
            client: client._id,
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            scope: token.scope,
        });
        if (!accessToken.user) {
            accessToken.user = {};
        }
        return accessToken;
    }
    async saveAuthorizationCode(code, client, user) {
        if (!client.userTypes.includes(user.userType))
            configs_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, `User Not Granted Access For ${client.name}`, response_1.ErrorCodes.invalid_user_type);
        const isLoginEnabled = await this.userRepository.isLoginEnabled(user._id);
        if (!isLoginEnabled)
            configs_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, "Login Is Not Enabled, Ask you admin to grant access", response_1.ErrorCodes.login_failure);
        const hasPortalAccess = await repository_1.AccessRepository.checkPortalAccess(isLoginEnabled.userType, client._id);
        if (!hasPortalAccess)
            configs_1.AppException.create(response_1.StatusCodes.UNAUTHORIZED_ACCESS, `User Not Granted Access For ${client.name}`, response_1.ErrorCodes.login_failure);
        return await this.oauthRepository.saveAuthCode({
            user: user._id,
            client: client._id,
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            scope: code.scope,
        });
    }
    async revokeToken(accessToken) {
        const result = await this.oauthRepository.revokeByRefreshToken(accessToken.refreshToken);
        return result.deletedCount > 0;
    }
    async revokeAuthorizationCode(code) {
        const result = await this.oauthRepository.revokeAuthorizationCode(code.authorizationCode);
        return result.deletedCount > 0;
    }
    async logout(userId, clientId) {
        return this.oauthRepository.logout(userId, clientId);
    }
    async getUserFromClient(client) {
        return {};
    }
}
exports.OauthModel = OauthModel;
exports.OauthImpl = new OauthModel();
//# sourceMappingURL=oauth.js.map