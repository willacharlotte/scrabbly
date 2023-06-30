CREATE DATABASE Scrabble
GO

USE Scrabbly
GO

CREATE TABLE Player(
playerId int unique not null,
firstname varchar(50),
lastname varchar(50),
email varchar(max) not null,
PRIMARY KEY (playerId)
);
GO

CREATE TABLE Game(
gameId int unique not null,
gameState varchar(50),
startTime time,
endTime time,
PRIMARY KEY(gameId)
);
GO

CREATE TABLE PlayerGame(
playerGameId int unique not null,
playerId int,
gameId int,
score int,
PRIMARY KEY (playerGameId),
FOREIGN KEY (gameId) References Game (gameId),
FOREIGN KEY (playerId) References Player (playerId),
);
GO


