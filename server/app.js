// server/app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dishRoutes from "./routes/dishRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from client/public directory
app.use('/models', express.static(path.join(__dirname, '../client/public/models')));

app.use("/api", dishRoutes);

// Export both default and named to satisfy any import style
export { app };
export default app;
