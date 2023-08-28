import express from "express";
import dotenv from "dotenv";
import connect from "./DB/connect.js";
import userRouter from './src/model/user.model.js';
import categoryRouter from './src/model/category.model.js';

dotenv.config();
const app = express();
const port = 5001;

app.use(express.json());
app.use(userRouter)
app.use(categoryRouter)
connect();

app.use((err , req , res, next)=>{
  res.status( err.statusCode  || 400).send({message : err.message});
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
