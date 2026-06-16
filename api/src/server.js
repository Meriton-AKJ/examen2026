import express from "express";
import cors from "cors";

import { tasksRouter } from "./routes/tasks.routes.js";
import { error } from "./middlewares/error.middleware.js";
import { environment } from "./config/environment.config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", tasksRouter);

app.use(error);

app.listen(environment.port, () => {
  console.log(`Server is running on port ${environment.port}`);
});