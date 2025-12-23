// server/app.js
import express from "express";
import cors from "cors";
import dishRoutes from "./routes/dishRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AR Menu Backend Running");
});

app.use("/api", dishRoutes);

export default app;
