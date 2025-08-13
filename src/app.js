import express from "express";
import morgan from "morgan";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import ResidenceRoutes from "./routes/ResidenceRoutes.js";
import PlansRoutes from "./routes/PlansRoutes.js";
import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../swagger-output.json" assert { type: 'json' };
 
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", UserRoutes, AdminRoutes, ResidenceRoutes, PlansRoutes);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
