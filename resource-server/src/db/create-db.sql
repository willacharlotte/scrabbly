CREATE DATABASE Scrabbly
GO

USE Scrabbly
GO

DROP TABLE IF EXISTS Game
GO

DROP TABLE IF EXISTS Player
GO

CREATE TABLE Player
(
    playerId int unique not null IDENTITY(1,1),
    username varchar(50) unique not null,
    token varchar(max),
    playerPassword varchar(max),
    PRIMARY KEY (playerId)
);
GO

CREATE TABLE Game
(
    gameId int unique not null IDENTITY(1,1),
    playerId int,
    playerOneScore int,
    playerTwoScore int,
    moveCount int,
    PRIMARY KEY(gameId),
    FOREIGN KEY (playerId) REFERENCES Player(playerId)
);
GO

--add Player for testing purposes-
-- INSERT INTO Player
--     (username, token, playerPassword)
-- VALUES
--     ('hello', 'asdf', 'asdf')
-- GO

