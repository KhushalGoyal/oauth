import { BaseEntity } from "../../helpers/entities/base";
import { ObjectID } from 'mongodb'

// https://medium.com/@darutk/oauth-2-0-client-authentication-4b5f929305d4
// Usefull link to understand client authentication
enum clientType {
    "CONFIDENTIAL" = "confidential",
    "PUBLIC" = "public"
}

enum clientProfile {
    "WEB" = "web application", // Confidential Client Type
    "USER_AGENT" = "user-agent-based application", // Public Client Type
    "NATIVE" = "native application" // Confidential Client Type
}