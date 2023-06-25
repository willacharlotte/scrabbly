"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.putMove = exports.postGame = exports.getGame = exports.getGames = void 0;
const dal_1 = require("../dal");
const getGames = (_, res) => {
    res.end(JSON.stringify(dal_1.Games.getGames()));
};
exports.getGames = getGames;
const getGame = (req, res) => {
    const gameId = req.params.id;
    try {
        const game = dal_1.Games.getGameById(Number(gameId));
        res.end(JSON.stringify(game));
    }
    catch (e) {
        let message = "";
        if (e instanceof Error)
            message = e.message;
        res.status(400);
        res.end(message);
    }
};
exports.getGame = getGame;
const postGame = (req, res) => {
    const users = dal_1.Users.getUsersFromBodyUsers(req.body);
    const game = dal_1.Games.postNewGame(users);
    res.end(JSON.stringify(game));
};
exports.postGame = postGame;
const putMove = (req, res) => {
    const gameId = req.params.id;
    const move = req.body;
    try {
        const game = dal_1.Games.putMoveInGame(Number(gameId), move);
        res.end(JSON.stringify(game));
    }
    catch (e) {
        let message = "";
        if (e instanceof Error)
            message = e.message;
        res.status(400);
        res.end(message);
    }
};
exports.putMove = putMove;
const deleteGame = (req, res) => {
    const gameId = req.params.id;
    try {
        dal_1.Games.deleteGame(Number(gameId));
        res.end();
    }
    catch (e) {
        let message = "";
        if (e instanceof Error)
            message = e.message;
        res.status(400);
        res.end(message);
    }
};
exports.deleteGame = deleteGame;
