"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHelper = void 0;
const bcrypt_1 = require("bcrypt");
const generate_password_1 = require("generate-password");
const envConfig_1 = require("../../configs/envConfig");
class PasswordHelper {
    /**
     * Used to encrypt password
     * @param text - text password
     */
    static encrypt(text) {
        return bcrypt_1.hashSync(text, envConfig_1.envConfig.application.oauth.salt);
    }
    /**
     * compare hash and text password
     * @param text - text passowrd
     * @param hash - hash
     */
    static compare(text, hash) {
        return bcrypt_1.compareSync(text, hash);
    }
    /**
     * used to create random password if needed
     */
    static createPassword() {
        return generate_password_1.generate({
            uppercase: false,
            length: 10,
            excludeSimilarCharacters: true,
            symbols: false,
            numbers: true,
        });
    }
}
exports.PasswordHelper = PasswordHelper;
//# sourceMappingURL=password.js.map