"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json());
//middleware to log all methods to console - only for testing purposes
app.use("*", (req, _, next) => {
    console.log(`${req.method} on ${req.originalUrl}`);
    next();
});
//all html pages, stylesheets and scripts from the frontend
app.use(express_1.default.static("./src/frontend", { extensions: ["html"] }));
//root page
app.get("/", function (_, res) {
    res.sendFile("index.html", {
        root: "./src/frontend/html",
        extensions: ["html"],
    });
});
// backend methods
app.get("/squares", controllers_1.getSquares);
app.get("/tiles", controllers_1.getTiles);
app.get("/games", controllers_1.getGames);
app.get("/games/:id", controllers_1.getGame);
app.post("/games", controllers_1.postGame);
app.put("/games/:id/move", controllers_1.putMove);
app.delete("/games/:id", controllers_1.deleteGame);
app.get("/users", controllers_1.getUsers);
app.get("/users/:username", controllers_1.getUser);
app.post("/users", controllers_1.postUser);
app.put("/users/:username", controllers_1.putUser);
app.delete("/users/:username", controllers_1.deleteUser);
app.listen(port, () => {
    console.log(`app listening on ${port}`);
});
