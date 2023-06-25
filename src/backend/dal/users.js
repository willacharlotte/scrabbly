"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var Users;
(function (Users) {
    // TODO put this in db
    const users = [];
    Users.getUsers = () => {
        return users;
    };
    Users.getUsersFromBodyUsers = (bodyUsers) => {
        const users = [];
        bodyUsers.forEach((user) => {
            if (!Users.doesUsernameExist(user.username))
                throw new Error(`user with username ${user.username} does not exist`);
            users.push(Users.getUserByUsername(user.username));
        });
        return users;
    };
    Users.getUserByUsername = (username) => {
        const user = users.find((user) => user.username === username);
        if (user === undefined)
            throw new Error("user with specified username does not exist");
        return user;
    };
    Users.doesUsernameExist = (username) => {
        try {
            Users.getUserByUsername(username);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    Users.postNewUser = (username) => {
        if (Users.doesUsernameExist(username))
            throw new Error("user with specified username already exists");
        const newUser = {
            username: username,
            games: [],
        };
        users.push(newUser);
        return newUser;
    };
    Users.putUser = (username, userToPut) => {
        if (Users.doesUsernameExist(userToPut.username))
            throw new Error("user with specified username already exists");
        Users.deleteUser(username);
        users.push(userToPut);
        return true;
    };
    Users.deleteUser = (username) => {
        const indexOfUser = users.findIndex((user) => user.username === username);
        if (indexOfUser === -1)
            throw new Error("user does not exist");
        users.splice(indexOfUser, 1);
        return true;
    };
})(Users || (exports.Users = Users = {}));
