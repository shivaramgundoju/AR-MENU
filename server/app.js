// server/app.js
import express from "express";
import cors from "cors";
import dishRoutes from "./routes/dishRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", dishRoutes);

// Export both default and named to satisfy any import style
export { app };
export default app;
