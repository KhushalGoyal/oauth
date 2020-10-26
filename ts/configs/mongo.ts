import { connect, Mongoose, set } from 'mongoose';
import { envConfig } from './envConfig';

class MongooseService {
    private static mongoConnection: Mongoose = undefined;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static async connect(): Promise<void> {
        set("debug", (envConfig.server.environment === "local"));
        const { username, password, host, port, name } = envConfig.database;
        // eslint-disable-next-line max-len
        const mongoUrl = `mongodb://${username}:${password}@${host}:${port}/${name}?ssl=true&authSource=admin&retryWrites=true`;
        if (!this.isConnected()) {
            connect(mongoUrl, {
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
        } else {
            console.info(`Database Already Connected`);
        }
    }

    public static setConnection(connection: Mongoose): void {
        this.mongoConnection = connection;
        this.mongoConnection.connection.on("disconnected", () => {
            console.info("database connection closed");
        });
    }

    public static isConnected(): boolean {
        if (this.mongoConnection && this.mongoConnection.connection) {
            const { readyState } = this.mongoConnection.connection;
            console.info(`MongoDB ready state = ${readyState}`);
            return readyState === 1;
        }
        return false;
    }

    public static getConnection(): Mongoose {
        return this.mongoConnection;
    }

    public static disconnect(): void {
        this.mongoConnection.connection.close(() => {
            this.mongoConnection = undefined;
            process.exit(0);
        });
    }
}

export default MongooseService;
