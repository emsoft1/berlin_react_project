# Next.js + node.js backened + postgress DB

    This is a template for a Next.js project with API request, 3dr party images (check next.config.js). with login pages.
    the API request is based on client-side rendering(each time the client request low performance but last data )

## Warnning

    all of the keys and passwords should be stored in the "secret.json" file or ".env" file for your local test.
    make sure both these files are in the ".gitignore" file ( to NOT accidentally upload the sensitive file ).

## Install

Create .env file and past login credentials in this file.

```
PG_USER=""
PG_HOST=""
PG_DB=""
PG_PASS=""
PG_PORT=
```

```
npm i
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Server

# installation

you have to add your npm package to "package.json" in the main folder

# file structure

all of the server-side code should be added in the server folder and each section needed to have a folder, like "db" for the database.

# Run server

```
node server/index.js
```

## Git branches

Nobody should be push to the "main" branch.
everybody should create a new branch with a number and a meaning full name and after code review, we can merge the code.

## troubleshot

if you get a issue about "SWR " you can try :

```
npm i

```
