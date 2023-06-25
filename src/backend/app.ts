import express from "express";
import cors from "cors";
import {corsOptions} from "../config/corsOptions.js"
import {usersRoute} from "../routes/api/users";
import { gamesRoute } from "../routes/api/games";
import { boardRoute } from "../routes/api/board";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors(corsOptions));

//middleware to log all methods to console - only for testing purposes
app.use("*", (req, _, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

//all html pages, stylesheets and scripts from the frontend
app.use(express.static("./src/frontend", { extensions: ["html"] }));

//builtin middleware to handle form data
app.use(express.urlencoded({extended: false}));

//root page
app.get("/", function (_, res) {
  res.sendFile("index.html", {
    root: "./src/frontend/html",
    extensions: ["html"],
  });
});

// backend routes
app.use('/', boardRoute);

app.use('/', gamesRoute);

app.use('/', usersRoute);

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
