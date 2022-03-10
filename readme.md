<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

<p align="center">
   <a href="https://circleci.com/gh/amazingandyyy/mern">
      <img src="https://circleci.com/gh/amazingandyyy/mern.svg?style=svg" />
   </a>
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, React, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## project structure
```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally
```

## Server-side usage(PORT: 5000)

### .env file

> mongodb url is stored in .env to connect to MongoDB,
> To read contracts.txt file in root folder and save the contracts, set READFILE as 1(default 0)


### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
```