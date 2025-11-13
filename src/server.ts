import express from "express";
import cors from "cors";
import router from "./routes/route";
import cookieParser from "cookie-parser";
const app = express();

const options = {
  origin: ["https://rate-my-store-alpha.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Cookie"],
  credentials: true,
};
app.use(cors(options));
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.listen(PORT, () => {
  console.log("server is start on port ", PORT);
});
