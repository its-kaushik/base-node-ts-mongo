# Spyne Assignment

## Tech Stack

I'm using the following things

1. **ExpressJS**: the web framework
2. **JOI**: the validation framework
3. **Typescript**: for type checking
4. **Prettier**: for formatting the code
5. **ESLint**: for linting and code quality maintainence
6. **Nodemon**: for development purposes
7. **Docker**: for ease of setup
8. **Pre-Commit**: for pre-commit hooks
9. **mongoose/mongoDB**: as the database

## Project Setup

Install the required dependecies

```sh
npm i
```

Next step is to run the script to generate public and private key-pairs for JWT token generation. The command is as follows:

**NOTE**: Before running this command, make sure you have a folder called **keys** in your root directory.

```sh
npm run generate-keys
```

This command will generate the keys and also, return secret on the console. Copy that, and save it in the **.env** file as **SECRET_KEY**.

Now, finally run

```sh
npm run start
```

## Database Schema

[DB Schema](./data/db_schema.pdf)
