import express from "express";
import { getSquares, getTiles } from "./controllers";

const app = express();
const port = 4000;

app.use(express.json());

//middleware to log all methods to console - only for testing purposes
app.use('*', (req, _, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

//all html pages, stylesheets and scripts from the frontend
app.use(express.static('./src/frontend', {extensions:['html']}));

//root page
app.get('/', function(_, res){
  res.sendFile('index.html', { root: './src/frontend/html' , extensions:['html'] });
});

app.get("/squares", getSquares);
app.get("/tiles", getTiles);

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
