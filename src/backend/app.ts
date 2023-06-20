import express from "express";
import { getSquares, getTiles } from "./controllers";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/squares", getSquares);
app.get("/tiles", getTiles);

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
