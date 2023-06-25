"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const dal_1 = require("../dal");
const getUsers = (_, res) => {
    res.end(JSON.stringify(dal_1.Users.getUsers()));
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    const username = req.params.username;
    try {
        const user = dal_1.Users.getUserByUsername(username);
        res.end(JSON.stringify(user));
    }
    catch (e) {
        let message = "";
        if (e instanceof Error)
            message = e.message;
        res.status(400);
        res.end(message);
    }
};
exports.getUser = getUser;
const postUser = (req, res) => {
    const { username } = req.body;
    try {
        const user = dal_1.Users.postNewUser(username);
        res.end(JSON.stringify(user));
    }
    catch (e) {
        let message = "";
        if (e instanceof Error)
            message = e.message;
        res.status(400);
        res.end(message);
    }
};
exports.postUser = postUser;
const putUser = (req, res) => {
    const username = req.params.username;
    const user = req.body;
    try {
        dal_1.Users.putUser(username, user);
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
exports.putUser = putUser;
const deleteUser = (req, res) => {
    const username = req.params.username;
    try {
        dal_1.Users.deleteUser(username);
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
exports.deleteUser = deleteUser;
