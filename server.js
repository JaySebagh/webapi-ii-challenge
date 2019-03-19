// implement your API here]
// import express 
const express = require('express');

const postsRouter = require('./data/posts/posts-router.js')

const server = express(); // creates new http server

// middleware
server.use(express.json());
server.use('/api/posts', postsRouter)


// exportin the server
module.exports = server;