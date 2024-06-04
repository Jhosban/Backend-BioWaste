import express from "express";
import morgan from "morgan";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import ResidenceRoutes from "./routes/ResidenceRoutes.js";
import PlansRoutes from "./routes/PlansRoutes.js";
 
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", UserRoutes, AdminRoutes, ResidenceRoutes, PlansRoutes);

export default app;
