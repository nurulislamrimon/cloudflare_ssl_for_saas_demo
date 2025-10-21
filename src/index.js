import express from "express";
import dotenv from "dotenv";
import domainRoutes from "./routes/domains.js";
import { prisma } from "./config/prisma.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/domains", domainRoutes);

app.get("/", (req, res) => res.send("☁️ Cloudflare SSL for SaaS API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
