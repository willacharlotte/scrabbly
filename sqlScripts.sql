CREATE DATABASE Scrabbly
GO

USE Scrabbly
GO

CREATE TABLE Player(
playerId int unique not null IDENTITY(1,1),
firstname varchar(50),
lastname varchar(50),
email varchar(max) not null,
username varchar(50) unique not null,
id int,
token varchar(max),
password varchar(max),
PRIMARY KEY (playerId)
);
GO

CREATE TABLE Game(
gameId int unique not null IDENTITY(1,1),
playerId int,
gameState varchar(max),
PRIMARY KEY(gameId)
);
GO

--get users--
SELECT * FROM Player

-- get userByEmail --
SELECT * FROM Player WHERE email = @email

--registerNewUser--
INSERT INTO Player (firstname, lastname, email)
VALUES (@firstname, @lastname,@email)

-- addNewGame--
INSERT INTO Game (playerId, gameState)
SELECT playerId, @gameState
FROM Player 
WHERE email = @email;


--getUser with the game they're associate with --
SELECT p.firstname, p.lastname, p.email, g.gameState
FROM Player p
Inner join Game g
ON p.playerId = g.playerId;
