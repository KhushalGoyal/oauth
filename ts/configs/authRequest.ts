export class BaseAuthRequest {
    user?: string;
    username: string;
    password: string;
    client_id: string;
    response_type: string;
    redirect_uri: string;
    state: string;
}
export class AuthTokenRequest extends BaseAuthRequest {
    client_secret: string;
    grant_type: string;
    code: string;
    refresh_token: string;
}