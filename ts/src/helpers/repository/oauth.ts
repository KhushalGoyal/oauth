import { Types } from "mongoose";
import { OAuthAccessTokenModel, OAuthCodeModel, ClientsModel } from "../../models";
import { Projections } from "../projections";
import { UsersRepository } from "./user";

export class OauthRepository {
    findTokenByAccessToken(accessToken: string): Promise<any> {
        return OAuthAccessTokenModel.findOne({ accessToken }).populate('user', Projections.Users.TokenPayload).populate('client') as any;
    }
    findTokenByRefreshToken(refreshToken: string): Promise<any> {
        return OAuthAccessTokenModel.findOne({ refreshToken }).populate('user', Projections.Users.TokenPayload).populate('client').lean() as any;
    }
    getAuthCodePayload(code: string): Promise<any> {
        return OAuthCodeModel.findOne({ authorizationCode: code }).populate('user', Projections.Users.TokenPayload).populate('client').lean() as any;
    }
    async saveToken(payload: any): Promise<any> {
        return (await OAuthAccessTokenModel.create(payload)).toObject();
    }
    async saveAuthCode(payload: any): Promise<any> {
        return (await OAuthCodeModel.create(payload)).toObject();
    }
    revokeByRefreshToken(refreshToken: string): Promise<any> {
        return OAuthAccessTokenModel.deleteOne({
            refreshToken,
        }) as any;
    }
    revokeAuthorizationCode(authorizationCode: string): Promise<any> {
        return OAuthCodeModel.deleteOne({
            authorizationCode,
        }) as any;
    }
    async logout(userId: string, clientId: string): Promise<any> {
        const client = await ClientsModel.findOne({ _id : clientId })
        return Promise.all([
            OAuthAccessTokenModel.deleteMany({ user: new Types.ObjectId(userId), client: new Types.ObjectId(client._id) }),
            OAuthCodeModel.deleteMany({ user: new Types.ObjectId(userId) }),
            new UsersRepository().updateLogout(userId),
        ]);
    }
    isLoggedIn(user: string): Promise<any> {
        return OAuthAccessTokenModel.findOne({ user: new Types.ObjectId(user), refreshTokenExpiresAt: { $gt: new Date() } }).lean() as any;
    }
}
