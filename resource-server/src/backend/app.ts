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
import { DbConnection } from "./dal/db-connection";

const app = express();
const port = 4000;

app.use(express.json());

//middleware to log all methods to console - only for testing purposes
app.use("*", (req, _, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

//all stylesheets and scripts from the frontend
app.use(express.static("./src/frontend", { extensions: ["html"] }));

// login page
app.get("/login", function (_, res) {
  res.sendFile("login.html", {
    root: "./src/frontend/html",
    extensions: ["html"],
  });
});

//root page
app.get("/", function (_, res) {
  res.sendFile("home.html", {
    //TODO: switch to login.html once done
    root: "./src/frontend/html",
    extensions: ["html"],
  });
});

//home page
app.get("/home", function (_, res) {
  res.sendFile("home.html", {
    root: "./src/frontend/html",
    extensions: ["html"],
  });
});

//game page
app.get("/game/*", function (_, res) {
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

// DELETE THIS
app.get("/test", async (_, res) => {
  res.end(
    JSON.stringify(await DbConnection.runQuery(`SELECT * FROM dbo.Player`))
  );
});

//any other routes go here
app.get("*", function (_, res) {
  res.sendFile("error.html", {
    root: "./src/frontend/html",
    extensions: ["html"],
  });
});

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
