"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("./configs/express"));
const mongo_1 = __importDefault(require("./configs/mongo"));
const envConfig_1 = require("./configs/envConfig");
const app = express_1.default.init();
const { port } = envConfig_1.envConfig.server;
/** Initiate mongo connection */
mongo_1.default.connect();
// Set view engine to ejs
app.set('view engine', 'ejs');
app.listen(port || 8080, () => {
    console.info(`server started on ${port}`);
});
process.on('SIGINT', () => {
    mongo_1.default.disconnect();
});
//# sourceMappingURL=server.js.map