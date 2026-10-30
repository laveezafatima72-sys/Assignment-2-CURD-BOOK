
import express, { type Application } from "express";
import bookRoutes from "./router/bookrouter";

const app: Application = express();

app.use(express.json());

app.use("/", bookRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
