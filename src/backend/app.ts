import express from "express";
import {
  getSquares,
  getTiles,
  getGame,
  getGames,
  postGame,
  putMove,
  deleteGame,
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "./controllers";

const app = express();
const port = 4000;

app.use(express.json());

//middleware to log all methods to console - only for testing purposes
app.use("*", (req, _, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

//all html pages, stylesheets and scripts from the frontend
app.use(express.static("./src/frontend", { extensions: ["html"] }));

//root page
app.get("/", function (_, res) {
  res.sendFile("game.html", {
    root: "./src/frontend/html",
    extensions: ["html"],
  });
});

// backend methods

app.get("/squares", getSquares);
app.get("/tiles", getTiles);

app.get("/games", getGames);
app.get("/games/:id", getGame);
app.post("/games", postGame);
app.put("/games/:id/move", putMove);
app.delete("/games/:id", deleteGame);

app.get("/users", getUsers);
app.get("/users/:username", getUser);
app.post("/users", postUser);
app.put("/users/:username", putUser);
app.delete("/users/:username", deleteUser);

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
