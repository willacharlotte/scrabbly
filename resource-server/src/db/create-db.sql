USE master;
GO

IF EXISTS(select *
from sys.databases
where name='TestDB')
DROP DATABASE TestDB

CREATE DATABASE TestDB;
GO

USE TestDB;
GO


CREATE TABLE [dbo].[Player]
(
    [player_id] varchar(36) NOT NULL ,
    [username] nvarchar(128) UNIQUE NOT NULL,
    [hashPassword] varchar(250) NOT NULL,
    [token_id] varchar(120) NULL,
    CONSTRAINT pk_players PRIMARY KEY (player_id),
);
GO

--add Player for testing purposes
-- INSERT INTO [dbo].[Player]
--     (player_id, username, hashPassword, token_id)
-- VALUES
--     ('asdf', 'hello', 'asdf', 'asdf')
-- GO

CREATE TABLE [dbo].[Tokens]
(
    [token_id] varchar(120) NOT NULL ,
    [algo] nvarchar(128) NOT NULL,
    [publicKey] varchar(max) NOT NULL,
    [expireAt] bigint NULL,
    CONSTRAINT pk_tokens PRIMARY KEY (token_id),
);
GO

CREATE TABLE [dbo].[Game]
(
    game_id int unique not null IDENTITY(1,1),
    player_id varchar(36),
    player_one_score int,
    player_two_score int,
    move_count int,
    PRIMARY KEY(game_id),
    FOREIGN KEY (player_id) REFERENCES Player(player_id)
);
GO

CREATE PROCEDURE [dbo].[getAllPlayers]
AS
BEGIN
    SELECT *
    from [dbo].[Player];
END
 GO


CREATE PROCEDURE [dbo].[userExists]
    @username nvarchar(128)
AS
BEGIN
    SELECT username
    from [dbo].[Player]
    WHERE username = @username;
END
 GO

CREATE PROCEDURE [dbo].[getPlayer]
    @username nvarchar(128)
AS
BEGIN
    SELECT *
    from [dbo].[Player]
    WHERE username = @username;
END
 GO

CREATE PROCEDURE [dbo].[registerPlayer]
    @player_id varchar(36),
    @username nvarchar(128),
    @hashPassword varchar(250)
AS
BEGIN
    INSERT INTO Player
        (player_id,username,hashPassword)
    VALUES(@player_id, @username, @hashPassword);
END
 GO

CREATE PROCEDURE [dbo].[insertToken]
    @token_id varchar(120),
    @player_id varchar(36),
    @algo nvarchar(120),
    @publicKey varchar(max),
    @expireAt bigint
AS
BEGIN
    UPDATE [dbo].[Player]
 SET token_id = @token_id
 WHERE player_id = @player_id;
    INSERT INTO [dbo].Tokens
        (token_id, algo, publicKey, expireAt)
    VALUES
        (@token_id, @algo, @publicKey, @expireAt)
END
 GO

CREATE PROCEDURE [dbo].[getToken]
    @token_id varchar(120)
AS
IF EXISTS ( SELECT *
from [dbo].[Tokens]
WHERE token_id = @token_id)
	BEGIN
    SELECT *
    FROM [dbo].Tokens
    WHERE token_id = @token_id;
END
 GO
