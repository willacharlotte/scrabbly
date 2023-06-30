import { User } from "../types";

export namespace Users {
  // TODO put this in db
  const users: User[] = [];

  export const getUsers = () => {
    return users;
  };

  export const getUsersFromBodyUsers = (bodyUsers: User[]) => {
    const users: User[] = [];
    bodyUsers.forEach((user) => {
      if (!doesUsernameExist(user.username))
        throw new Error(`user with username ${user.username} does not exist`);
      users.push(getUserByUsername(user.username));
    });
    return users;
  };

  export const getUserByUsername = (username: string) => {
    const user = users.find((user) => user.username === username);
    if (user === undefined)
      throw new Error("user with specified username does not exist");

    return user;
  };

  export const doesUsernameExist = (username: string) => {
    try {
      getUserByUsername(username);
      return true;
    } catch {
      return false;
    }
  };

  export const postNewUser = (username: string) => {
    if (doesUsernameExist(username))
      throw new Error("user with specified username already exists");

    const newUser: User = {
      username: username,
      games: [],
    };

    users.push(newUser);
    return newUser;
  };

  export const putUser = (username: string, userToPut: User) => {
    if (doesUsernameExist(userToPut.username))
      throw new Error("user with specified username already exists");

    deleteUser(username);
    users.push(userToPut);

    return true;
  };

  export const deleteUser = (username: string) => {
    const indexOfUser = users.findIndex((user) => user.username === username);
    if (indexOfUser === -1) throw new Error("user does not exist");

    users.splice(indexOfUser, 1);
    return true;
  };
}
