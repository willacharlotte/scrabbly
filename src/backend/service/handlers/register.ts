import argon from "argon2";
import UUID from "pure-uuid";
import express, { Request, Response, NextFunction } from "express";
import { Users } from "../../dal";
import { User } from "../../types/user";

async function handleCreateCredentialsUsernamePassword(request: Request , response: Response) {
    if (typeof request.body.username !== "string" || request.body.username.length < 1) {
        // 
        return response.sendStatus(400); 
    }
    if (typeof request.body.password !== "string" || request.body.password.length < 8) {
        return response.sendStatus(400); 
    }
    
    const hash = await argon.hash(request.body.password);
    const username = request.body.username.trim();
    const lowerCaseUsername = username.toLowerCase();
    const credentialsKey = `credentials:${lowerCaseUsername}`;
    
    // const store = request.app.locals.store; //db

    // console.log('HRE',Users.getUserByUsername(lowerCaseUsername));
    // const user = Users.getUserByUsername(lowerCaseUsername).then(user => console.log(user))

    // ensure username exists
    if (await Users.doesUsernameExist(lowerCaseUsername)) {
        return response.sendStatus(409); //confilct
    }

    // Create identifier scoped to our host
    const uuid = new UUID(4).format();
    
    Users.postNewUser(lowerCaseUsername, uuid, hash);
    
    // Users.postNewUser
    // const identity = {
    // id: uuid,
    // primaryUsername: username
    // };
    // // Store our identity
    // await store.put(`identity:${uuid}`, JSON.stringify(identity));
    // // Store our new credentials
    // await store.put(credentialsKey, JSON.stringify({
    //     hash,
    // identity: uuid
    // }));

    return response.status(201).json({
        id: uuid
    });
    
}

function handleCreateCredentialsRoute(request: Request, response: Response, next: NextFunction) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    // credential types
    switch(request.body.type) {
        case "username-password": return handleCreateCredentialsUsernamePassword(request, response).catch(next);
        default: response.sendStatus(400);
    }
}

export default [
    express.json(),
    handleCreateCredentialsRoute
];