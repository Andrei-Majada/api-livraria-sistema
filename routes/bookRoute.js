const express = require('express');
const { createBook, listBooks, listBooksTitle, listBooksCat, listBooksAutor, listBooksEdit, editBook, deleteBook, listIndisp } = require('../controllers/controllerBook');
const middlewares = require("../middlewares");

//routes
module.exports = (app) => {
    app.get('/search', listBooks); //listar todos os livros
    app.get('/searchTitle/:title', listBooksTitle); //listar livro pelo titulo
    app.get('/searchCat/:categoria', listBooksCat); //listar livro pela categoria
    app.get('/searchAutor/:autor', listBooksAutor); //listar livro pelo autor
    app.get('/searchEdit/:editora', listBooksEdit); //listar livro pela editora
    app.get('/searchIndisp', listIndisp); //listar livro indisponiveis
    app.post('/createBook', middlewares.isAuthenticated, createBook); //cadastrar novo livro
    app.put('/edit/:id_livro', middlewares.isAuthenticated, editBook); //atualizar dados dos livros.pos
    app.delete('/deleteBook/:id_livro', middlewares.isAuthenticated, deleteBook); //deletar um livro
}