"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const node_sass_middleware_1 = __importDefault(require("node-sass-middleware"));
const middleware_1 = require("../middleware");
const envConfig_1 = require("./envConfig");
const app_1 = __importDefault(require("../routes/app"));
class ExpressApp {
    static middlewares() {
        this.app = express_1.default();
        // view engine setup
        this.app.set('views', path_1.default.join(__dirname, '../../views'));
        this.app.set('view engine', 'ejs');
        this.app.use(node_sass_middleware_1.default({
            src: path_1.default.join(__dirname, '../../public'),
            dest: path_1.default.join(__dirname, '../../public'),
            debug: true,
            indentedSyntax: false,
            sourceMap: true,
        }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: "10mb" }));
        this.app.use(body_parser_1.default.json({ limit: "10mb" }));
        this.app.use(cookie_parser_1.default());
        this.app.use(morgan_1.default("combined"));
        this.app.use(express_session_1.default({
            secret: "secret",
            cookie: { maxAge: 60000 },
        }));
        // this.app.use(flash());
        this.app.use("/", app_1.default);
        // this.app.use("/api", AppController);
        if (envConfig_1.envConfig.server.environment !== 'PROD') {
            this.app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        }
        this.app.use(middleware_1.errorHandler);
    }
    static init() {
        this.middlewares();
        return this.app;
    }
}
ExpressApp.app = undefined;
exports.default = ExpressApp;
//# sourceMappingURL=express.js.map