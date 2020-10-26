"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://medium.com/@darutk/oauth-2-0-client-authentication-4b5f929305d4
// Usefull link to understand client authentication
var clientType;
(function (clientType) {
    clientType["CONFIDENTIAL"] = "confidential";
    clientType["PUBLIC"] = "public";
})(clientType || (clientType = {}));
var clientProfile;
(function (clientProfile) {
    clientProfile["WEB"] = "web application";
    clientProfile["USER_AGENT"] = "user-agent-based application";
    clientProfile["NATIVE"] = "native application"; // Confidential Client Type
})(clientProfile || (clientProfile = {}));
//# sourceMappingURL=client-config.js.map