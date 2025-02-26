import http from "http";
import express from "express";
import router from "./app/routes/routes";
import cors from "cors";
import notFound from "./app/middleWare/notFound";
import { globalErrorHandler } from "./app/middleWare/globalErrorHandler";


const app = express();
app.use(express.json());
app.use(cors());

// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/api/v1", logActivity);
app.use(router);
app.use(notFound);

app.use(globalErrorHandler);

export default app;
