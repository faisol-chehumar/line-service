import express from "express";

import routes from "./routes";
import middlewares from "./routes/middlewares";

const app = express();

// All middlewares
app.use(middlewares);

// Routes
app.use(routes);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}...`);
});
