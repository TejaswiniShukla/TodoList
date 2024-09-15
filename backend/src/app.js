import express from "express";
import connectDb from "./config/db.js";
import todoRouter from "./routes/todoRoutes.js";
import Cors from 'cors';
const app = express(); //initializing the express
connectDb(); //connecting mongodb

app.use(express.json()); //parsing the req into json globally

app.get("/", (req, res) => {
  res.send("hellow me");
});
app.use(Cors())
app.use("/", todoRouter);

//listening port:creating server
app.listen(process.env.port, () => {
  console.log(`Server running at http://localhost:${process.env.port}/`);
});
