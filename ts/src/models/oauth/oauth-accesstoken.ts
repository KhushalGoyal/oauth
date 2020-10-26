import { Schema, model, Types } from "mongoose";

const OAuthAccessTokenSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users', index: true },
    client: { type: Types.ObjectId, ref: 'clients', index: true },
    accessToken: { type: String, index: true },
    accessTokenExpiresAt: { type: Date, index: true },
    refreshToken: { type: String, index: true },
    refreshTokenExpiresAt: { type: Date, index: true },
    scope: { type: String, index: true },
}, { timestamps: true });

export const OAuthAccessTokenModel = model("oauth_access_tokens", OAuthAccessTokenSchema);
