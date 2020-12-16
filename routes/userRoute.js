const express = require('express')
const router = express.Router();
const { index, createUser, createBook, listBooks, listBooksTitle, listBooksCat, listBooksAutor, listBooksEdit } = require('../controllers/user');

//routes
module.exports = (app) => {
    app.get('/', index); //index
    app.post('/createUser', createUser); //criar conta
    app.post('/createBook', createBook); //cadastrar novo livro
    app.get('/search', listBooks); //listar todos os livros
    app.get('/searchTitle/:title', listBooksTitle); //listar livro pelo titulo
    app.get('/searchCat/:categoria', listBooksCat); //listar livro pela categoria
    app.get('/searchAutor/:autor', listBooksAutor); //listar livro pelo autor
    app.get('/searchEdit/:editora', listBooksEdit); //listar livro pela editora

// router.get('/login', login); //fazer login

// router.delete('/deleteUder/:id_user', userController.delete); //deletar usuario

// router.create('/createBook', userController.create); //inserir novo livro

// router.patch('/edit/:id_livro', userController.patch); //atualizar dados dos livros

// router.delete('/deleteBook/:id_livro', userController.delete); //deletar um livro

// router.post('');

}
