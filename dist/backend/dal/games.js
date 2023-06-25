"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Games = void 0;
const utils_1 = require("../utils");
var Games;
(function (Games) {
    // TODO put this in db
    const games = [];
    const getIndexById = (id) => {
        return games.findIndex((game) => game.id === id);
    };
    const getGreatestId = () => {
        return games
            .map((game) => game.id)
            .reduce((prev, next) => (prev > next ? prev : next), 0);
    };
    Games.getGames = () => {
        return games;
    };
    Games.getGameById = (id) => {
        const gameIndex = getIndexById(id);
        if (gameIndex === -1)
            throw new Error("game with specified id does not exist");
        return games[gameIndex];
    };
    Games.postNewGame = (users) => {
        const id = getGreatestId() + 1;
        const newGame = (0, utils_1.createNewGame)(users, id);
        games.push(newGame);
        return newGame;
    };
    Games.putMoveInGame = (id, move) => {
        const game = Games.getGameById(id);
        const newPlacedTiles = (0, utils_1.newPlacedTilesFromMove)(move);
        if (move.firstLetterLocation.col.toUpperCase() ===
            move.firstLetterLocation.col)
            throw new Error("firstLetterLocation needs to have a lower case col");
        game.players[move.playerNumber].rack = (0, utils_1.updateRack)(newPlacedTiles, game.players[move.playerNumber].rack, game.tiles);
        game.moves.push(move);
        game.placedTiles.push(...newPlacedTiles);
        return game;
    };
    Games.deleteGame = (id) => {
        const gameIndex = getIndexById(id);
        if (gameIndex === -1)
            throw new Error("game with specified id does not exist");
        games.splice(gameIndex, 1);
        return true;
    };
})(Games || (exports.Games = Games = {}));
