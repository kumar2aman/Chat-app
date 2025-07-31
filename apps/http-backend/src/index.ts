import express from "express";
import { router } from "./api/v1/auth";

const app = express();

app.use(express.json());



app.use("/api/v1", router);

app.post("/", (req, res)=>{
  res.json({message:"hello world"})
})

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});