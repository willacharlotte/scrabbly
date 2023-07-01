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

-- --get users--
-- SELECT *
-- FROM Player

-- -- get userByEmail --
-- SELECT *
-- FROM Player
-- WHERE email = @email

--registerNewUser--
INSERT INTO Player
    (username, token, playerPassword)
VALUES
    ('hello', 'asdf', 'asdf')
GO

-- -- addNewGame--
-- INSERT INTO Game
--     (playerId, gameState)
-- SELECT playerId, @gameState
-- FROM Player
-- WHERE email = @email;


-- --getUser with the game they're associate with --
-- SELECT p.firstname, p.lastname, p.email, g.gameState
-- FROM Player p
--     Inner join Game g
--     ON p.playerId = g.playerId;
