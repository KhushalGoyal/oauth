"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OauthRepository = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../../models");
const projections_1 = require("../projections");
const user_1 = require("./user");
class OauthRepository {
    findTokenByAccessToken(accessToken) {
        return models_1.OAuthAccessTokenModel.findOne({ accessToken }).populate('user', projections_1.Projections.Users.TokenPayload).populate('client');
    }
    findTokenByRefreshToken(refreshToken) {
        return models_1.OAuthAccessTokenModel.findOne({ refreshToken }).populate('user', projections_1.Projections.Users.TokenPayload).populate('client').lean();
    }
    getAuthCodePayload(code) {
        return models_1.OAuthCodeModel.findOne({ authorizationCode: code }).populate('user', projections_1.Projections.Users.TokenPayload).populate('client').lean();
    }
    async saveToken(payload) {
        return (await models_1.OAuthAccessTokenModel.create(payload)).toObject();
    }
    async saveAuthCode(payload) {
        return (await models_1.OAuthCodeModel.create(payload)).toObject();
    }
    revokeByRefreshToken(refreshToken) {
        return models_1.OAuthAccessTokenModel.deleteOne({
            refreshToken,
        });
    }
    revokeAuthorizationCode(authorizationCode) {
        return models_1.OAuthCodeModel.deleteOne({
            authorizationCode,
        });
    }
    async logout(userId, clientId) {
        const client = await models_1.ClientsModel.findOne({ _id: clientId });
        return Promise.all([
            models_1.OAuthAccessTokenModel.deleteMany({ user: new mongoose_1.Types.ObjectId(userId), client: new mongoose_1.Types.ObjectId(client._id) }),
            models_1.OAuthCodeModel.deleteMany({ user: new mongoose_1.Types.ObjectId(userId) }),
            new user_1.UsersRepository().updateLogout(userId),
        ]);
    }
    isLoggedIn(user) {
        return models_1.OAuthAccessTokenModel.findOne({ user: new mongoose_1.Types.ObjectId(user), refreshTokenExpiresAt: { $gt: new Date() } }).lean();
    }
}
exports.OauthRepository = OauthRepository;
//# sourceMappingURL=oauth.js.map