const express = require('express')
const { index, createUser, login, logout} = require('../controllers/controllerUser');
const middlewares = require("../middlewares")

//routes
module.exports = (app) => {
    app.get('/', index); //index
    app.post('/createUser', createUser); //criar conta
    app.post('/login', login); //fazer login
    app.get('/logout', middlewares.isAuthenticated, logout); //fazer logout
}
