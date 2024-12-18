import express, { Application, Response } from "express";
import sequelize from "./database";
import todoRoutes from "./routes/todos";

const app: Application = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => console.log("Database connected ✅"))
  .catch((error) => console.error("Unable to connect to the database:", error));

sequelize
  .sync({ force: true }) 
  .then(() => console.log("Models synchronized ✅"))
  .catch((error) => console.error("Error synchronizing models:", error));

app.use(express.json());

app.use(cors());

app.use("/api/todos", todoRoutes);

app.get("/", (res: Response) => {
  res.send("API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
