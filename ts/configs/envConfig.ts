/* eslint-disable max-len */
export const envConfig = {
    server: {
        port: Number.parseInt(process.env.PORT, 10) || 8080,
        baseUrl: process.env.BASE_URL || "http://localhost:8080",
        environment: process.env.ENV || "PROD",
    },
    database: {
        username : 'khushal',
        password : 'wmy1wrpKJJkB2eek',
        host : 'cluster0-shard-00-01.cjoso.azure.mongodb.net',
        port : '27017',
        name : 'authServer'
    },
    application: {
        oauth: {
            salt: Number.parseInt(process.env.PASSWORD_SALT_ROUNDS, 10) || 10,
            accessTokenExpiration: Number.parseInt(process.env.ACCESS_TOKEN_EXPIRATION, 10) || 604800,
            maxExpiration: Number.parseInt(process.env.MAX_EXPIRATION, 10) || 604800,
            authCodeLifeTime: Number.parseInt(process.env.AUTHORIZATION_CODE_LIFE_TIME, 10) || 300,
            accessTokenLifeTime: Number.parseInt(process.env.ACCESS_TOKEN_LIFETIME, 10) || 3600,
            refreshTokenLifeTime: Number.parseInt(process.env.REFRESH_TOKEN_LIFETIME, 10) || 25200,
            authCookieLifeTime: Number.parseInt(process.env.AUTH_SERVER_COOKIE, 10) || 2500000,
            jwtSecret: process.env.JWT_SECRET || "Goai887asgyg67TFSacdaDahgh67sadGplpaAskk761",
        },
        email: {
        },
        portals: {
        },
        swagger: {
            url: process.env.SWAGGER_URL || "http://localhost:8080",
        }
    },
};

export enum ClientTypes {
    'PORTAL' = 'PORTAL',
    'HOROSCOPE' = 'HOROSCOPE',
    'DESERT_CO' = 'DESERT_CO'
}

export enum UserTypes {
    'SUPER_ADMIN' = 'SUPER_ADMIN',
    'ADMIN' = 'ADMIN',
    'USER' = 'USER'
}