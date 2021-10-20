import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { shortnerRouter } from "./routes/urlShortner.js";
import { redirectRouter } from "./routes/urlRedirect.js";
import { userRouter } from "./routes/Authentication.js";

const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.connect(`${url}`, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("MONGODB is Connected"));

app.use(express.json());
app.use(cors());

app.use("/", redirectRouter);
app.use("/", userRouter);
app.use("/", shortnerRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Node App");
});

app.listen(PORT, () => console.log(`Server is Started at ${PORT}`));
