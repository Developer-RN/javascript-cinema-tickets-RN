import  express from 'express';
import  routes from './routes/routes.js';
import bodyParser from 'body-parser';
import ErrorHandler from "./pairtest/lib/ErrorHandler.js";
const app = express();
app.use(bodyParser.json());
app.use('/',routes);

app.use(ErrorHandler)

export default app;