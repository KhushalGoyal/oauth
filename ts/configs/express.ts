import express, { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJSON from "./swagger.json";
import nodeSassMiddleware from "node-sass-middleware";
import { errorHandler } from "../middleware";
import { envConfig } from "./envConfig";
import AppController  from '../routes/app'

class ExpressApp {
    private static app: Express = undefined;

    private static middlewares(): void {
        this.app = express();
        // view engine setup
        this.app.set('views', path.join(__dirname, '../../views'));
        this.app.set('view engine', 'ejs');

        this.app.use(nodeSassMiddleware({
            src: path.join(__dirname, '../../public'),
            dest: path.join(__dirname, '../../public'),
            debug: true,
            indentedSyntax: false,
            sourceMap: true,
        }));

        this.app.use(express.static(path.join(__dirname, '../../public')));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
        this.app.use(bodyParser.json({ limit: "10mb" }));
        this.app.use(cookieParser());
        this.app.use(morgan("combined"));
        this.app.use(session({
            secret: "secret",
            cookie: { maxAge: 60000 },
        }));
        // this.app.use(flash());
        this.app.use("/", AppController)
        // this.app.use("/api", AppController);
        if (envConfig.server.environment !== 'PROD') {
            this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJSON));
        }
        this.app.use(errorHandler);
    }

    public static init(): Express {
        this.middlewares();
        return this.app;
    }
}

export default ExpressApp;
