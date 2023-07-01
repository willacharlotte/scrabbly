# Scrabbly

### A classic word creation game

## Prerequisites

- backend:
  - node ^v16
  - npm ^v8
  - tsc ^v5
- db:
  - ability to make MSSQL instances on local computer

## Setup

- run `npm run install:identity && npm run install:resource` to install dependencies
- connect to a MSSQL instance and run `src/db/create-db.sql` to create database and tables
- run `cp .env.example .env` to create env
- populate `.env` variables with relevant values

## Running

- identity-server:
  - run `npm run start:identity` in terminal to start the identity server
- resource-server:
  - run `npm run build:resource` then `npm run start:resource` in terminal to start the resource-server
- frontend:
  - open http://localhost:4000

## Authors

- [Gabriel Tidy](https://github.com/Gabriel-BBD)
- [Luyanda Duma](https://github.com/Noxy627)
- [Mmasehume Raphiri](https://github.com/mmasehume-bbd)
- [Willa Lyle](https://github.com/willacharlotte)
