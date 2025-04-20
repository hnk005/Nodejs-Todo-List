import process from "process";
import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routers";
import connectDB from "./config/database";
import errorMiddleware from "./middlewares/error.middlewares";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());


// Database Connection
connectDB();

// Routes
app.use("/v1/api", router);

// // Error handling middleware
app.use(errorMiddleware);


app.listen(port, () => {
  console.log(
    `Server đang chạy tại http://localhost:${port}`
  );
});
