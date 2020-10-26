"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensHelper = exports.secretKey = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.secretKey = "SalvdIaFwcKDyBoTJ4gVJHmzFrZrSi8ChghvsdbfQAZ";
class TokensHelper {
    static generateToken(payload, configs) {
        return jsonwebtoken_1.sign(payload, exports.secretKey, configs);
    }
    static verifyToken(token, verifyOptions) {
        return jsonwebtoken_1.verify(token, exports.secretKey, verifyOptions);
    }
    static decodeToken(token) {
        return jsonwebtoken_1.decode(token);
    }
}
exports.TokensHelper = TokensHelper;
//# sourceMappingURL=token.js.map