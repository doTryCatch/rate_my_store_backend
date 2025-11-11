import express from "express";
import cors from "cors";
import router from "./routes/route";
const app = express();
const options = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(options));
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use("/api", router);
app.listen(PORT, () => {
  console.log("server is start on port ", PORT);
});
