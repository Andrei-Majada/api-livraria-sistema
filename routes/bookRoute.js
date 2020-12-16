const express = require('express');
const router = express.Router();
const { createBook, listBooks, listBooksTitle, listBooksCat, listBooksAutor, listBooksEdit, editLivro } = require('../controllers/user');
const middlewares = require("../middlewares");

//routes
module.exports = (app) => {
    app.get('/search', listBooks); //listar todos os livros
    app.get('/searchTitle/:title', listBooksTitle); //listar livro pelo titulo
    app.get('/searchCat/:categoria', listBooksCat); //listar livro pela categoria
    app.get('/searchAutor/:autor', listBooksAutor); //listar livro pelo autor
    app.get('/searchEdit/:editora', listBooksEdit); //listar livro pela editora
    app.post('/createBook', middlewares.isAuthenticated, createBook); //cadastrar novo livro
    app.put('/edit/:id_livro', middlewares.isAuthenticated, editLivro); //atualizar dados dos livros.pos
//  app.delete('/deleteBook/:id_livro', userController.delete); //deletar um livro
}