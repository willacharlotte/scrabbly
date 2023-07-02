import express from "express";
import { gamesRoute, boardRoute } from "./routes/api";
import { DbConnection } from "./dal/db-connection.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());

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

// backend routes
app.use("/", boardRoute);
app.use("/", gamesRoute);

app.get("/identity_server", async (_, res) => {
  res.end(
    JSON.stringify(process.env.IDENTITY_SERVER || "http://localhost:8080")
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
