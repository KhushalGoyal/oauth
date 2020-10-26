// eslint-disable-next-line @typescript-eslint/no-var-requires
import OAuth2Server from 'oauth2-server';
import { OauthImpl } from "../../helpers";
import { envConfig } from './../../../configs/envConfig';

const { accessTokenLifeTime, authCodeLifeTime, refreshTokenLifeTime } = envConfig.application.oauth;

export const oauth = new OAuth2Server({
    model: OauthImpl as any,
    allowEmptyState: true,
    authorizationCodeLifetime: authCodeLifeTime,
    authenticateHandler: { handle: (reqs: any): any => reqs.body.user },
    accessTokenLifetime: accessTokenLifeTime,
    refreshTokenLifetime: refreshTokenLifeTime,
    requireClientAuthentication: { authorization_code: true, refresh_token: true },
});
