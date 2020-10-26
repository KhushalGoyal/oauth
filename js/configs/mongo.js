"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const envConfig_1 = require("./envConfig");
class MongooseService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    static async connect() {
        mongoose_1.set("debug", (envConfig_1.envConfig.server.environment === "local"));
        const { username, password, host, port, name } = envConfig_1.envConfig.database;
        // eslint-disable-next-line max-len
        const mongoUrl = `mongodb://${username}:${password}@${host}:${port}/${name}?ssl=true&authSource=admin&retryWrites=true`;
        if (!this.isConnected()) {
            mongoose_1.connect(mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                socketTimeoutMS: 60000,
                connectTimeoutMS: 60000,
            })
                .then((connection) => {
                console.info(`successfully connected to database`);
                // Creating default Role
                // insertAdminDefaultAccess()
                this.setConnection(connection);
            })
                .catch((err) => {
                console.warn(`mongo connection error`, err);
            });
        }
        else {
            console.info(`Database Already Connected`);
        }
    }
    static setConnection(connection) {
        this.mongoConnection = connection;
        this.mongoConnection.connection.on("disconnected", () => {
            console.info("database connection closed");
        });
    }
    static isConnected() {
        if (this.mongoConnection && this.mongoConnection.connection) {
            const { readyState } = this.mongoConnection.connection;
            console.info(`MongoDB ready state = ${readyState}`);
            return readyState === 1;
        }
        return false;
    }
    static getConnection() {
        return this.mongoConnection;
    }
    static disconnect() {
        this.mongoConnection.connection.close(() => {
            this.mongoConnection = undefined;
            process.exit(0);
        });
    }
}
MongooseService.mongoConnection = undefined;
exports.default = MongooseService;
//# sourceMappingURL=mongo.js.map