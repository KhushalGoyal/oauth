/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import ExpressApp from './configs/express';
import MongooseService from "./configs/mongo";
import { envConfig } from "./configs/envConfig";

const app = ExpressApp.init();
const { port } = envConfig.server;

/** Initiate mongo connection */
MongooseService.connect();

// Set view engine to ejs
app.set('view engine', 'ejs');

app.listen(port || 8080, () => {
  console.info(`server started on ${port}`);
});

process.on('SIGINT', () => {
  MongooseService.disconnect();
});
