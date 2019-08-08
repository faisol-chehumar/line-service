import express from "express";

import routes from "./routes";
import middlewares from "./routes/middlewares";

const app = express();

app.use(middlewares); // All middlewares
app.use(routes); // Routes

app.listen(3000, () => { console.log("Running at localhost:3000"); });
