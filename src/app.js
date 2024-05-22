import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import crudRouter from "./routes/crud-routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.json());

app.use("/api", crudRouter, authRouter);

export default app;
