import jwt, { sign, verify, decode } from "jsonwebtoken";

export const secretKey = "SalvdIaFwcKDyBoTJ4gVJHmzFrZrSi8ChghvsdbfQAZ";

export class TokensHelper {
    public static generateToken(payload: any, configs?: jwt.SignOptions) {
        return sign(payload, secretKey, configs)
    }

    public static verifyToken<T>(token: string, verifyOptions?: jwt.VerifyOptions){
        return verify(token, secretKey, verifyOptions) as any as T;
    }

    public static decodeToken<T>(token: string){
        return decode(token) as T;
    }
}