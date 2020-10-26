import { Schema, model, Types } from "mongoose";

const OAuthCodesSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users', index: true },
    client: { type: Types.ObjectId, ref: 'clients', index: true },
    authorizationCode: { type: String, index: true },
    expiresAt: { type: Date, index: true },
    scope: { type: String, index: true },
}, { timestamps: true });

export const OAuthCodeModel = model("oauth_codes", OAuthCodesSchema);
