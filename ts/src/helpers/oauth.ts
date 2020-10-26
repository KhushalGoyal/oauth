/* eslint-disable max-len */
import { BaseModel, Token, RefreshToken, Client, User, Falsey, AuthorizationCode } from "oauth2-server";
import { envConfig } from "../../configs/envConfig";
import { PasswordHelper } from "./password";
import { ClientsEntity, UserEntity } from "./entities";
import { UsersRepository, OauthRepository, AccessRepository } from "./repository";
import { BaseTokenPayload, EntityTokenPayload } from "./tokenPayload";
import { AppException } from "../../configs";
import { TokensHelper } from "./token";
import { StatusCodes, ErrorCodes } from "../../response";
import { ClientsRepository } from "./repository";
import cookieParser from "cookie-parser";
const { accessTokenLifeTime } = envConfig.application.oauth;

export class OauthModel implements BaseModel {
    userRepository = new UsersRepository();
    oauthRepository = new OauthRepository();
    public generateJWT(payload: UserEntity, client: any): string {
        return TokensHelper.generateToken({ ...payload }, {
            expiresIn: accessTokenLifeTime,
            audience: client.clientId,
            issuer: envConfig.server.baseUrl,
        });
    }

    public async generateAccessToken(client: ClientsEntity, user: UserEntity, scope: any): Promise<any> {
        let payload: BaseTokenPayload;
        delete user.password;
        if (!client.userTypes.includes(user.userType)) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, `User Not Granted Access For ${client.name}`, ErrorCodes.invalid_user_type);
        const entityUser = await this.userRepository.getTokenPayload(user._id);
        payload = Object.assign(new EntityTokenPayload(), { ...user, ...{ userType: entityUser.userType } });
        payload.scope = client.clientId;
        return this.generateJWT(payload, client);
    }

    public async getAccessToken(accessToken: string): Promise<Token | Falsey> {
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

    public async getRefreshToken(refreshToken: string): Promise<RefreshToken> {
        return this.oauthRepository.findTokenByRefreshToken(refreshToken);
    }

    public getAuthorizationCode(code: string): Promise<AuthorizationCode> {
        return this.oauthRepository.getAuthCodePayload(code);
    }

    public getClient = (clientId: string, clientSecret: string): Promise<Client> => {
        const clientRepository = new ClientsRepository();
        const params: any = { clientId };
        if (clientSecret) {
            params.clientSecret = clientSecret;
        }
        return clientRepository.findByCredentials(params);
    }

    public async getUser(username: string, password: string): Promise<User | Falsey> {
        const userRepository = new UsersRepository();
        const user = await userRepository.tokenPayload(username);
        if (user && user.password && PasswordHelper.compare(password, user.password)) {
            delete user.password;
            return user;
        }
        return false;
    }

    public async saveToken(token: Token, client: Client, user: User): Promise<Token | Falsey> {
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

    public async saveAuthorizationCode(code: any, client: ClientsEntity, user: User): Promise<AuthorizationCode> {
        if (!client.userTypes.includes(user.userType)) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, `User Not Granted Access For ${client.name}`, ErrorCodes.invalid_user_type);
        const isLoginEnabled = await this.userRepository.isLoginEnabled(user._id);
        if (!isLoginEnabled) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, "Login Is Not Enabled, Ask you admin to grant access", ErrorCodes.login_failure);
        const hasPortalAccess = await AccessRepository.checkPortalAccess(isLoginEnabled.userType as string, client._id);
        if (!hasPortalAccess) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, `User Not Granted Access For ${client.name}`, ErrorCodes.login_failure);
        return await this.oauthRepository.saveAuthCode({
            user: user._id,
            client: client._id,
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            scope: code.scope,
        }) as AuthorizationCode;
    }

    public async revokeToken(accessToken: Token): Promise<boolean> {
        const result = await this.oauthRepository.revokeByRefreshToken(accessToken.refreshToken);
        return result.deletedCount > 0;
    }

    public async revokeAuthorizationCode(code: AuthorizationCode): Promise<boolean> {
        const result = await this.oauthRepository.revokeAuthorizationCode(code.authorizationCode);
        return result.deletedCount > 0;
    }

    public async logout(userId: string, clientId: string): Promise<any> {
        return this.oauthRepository.logout(userId, clientId);
    }

    public async getUserFromClient(client: Client): Promise<User> {
        return {} as User;
    }
}

export const OauthImpl = new OauthModel();
