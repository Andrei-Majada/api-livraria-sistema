const express = require('express')
const router = express.Router();
const { index, createUser, createBook } = require('../controllers/user');

//routes
module.exports = (app) => {
    app.get('/', index); //index
    app.post('/createUser', createUser); //criar conta
    app.post('/createBook', createBook); //cadastrar novo livro


// router.get('/login', login); //fazer login

// router.get('/', listarLivros); //listar todos os livros

// router.get('/search/:id_livro', listLivroID); //listar livro pelo id

// router.get('/search/:title', userController.get); //listar livro pelo titulo

// router.get('/search/:category', userController.get); //listar livro pela categoria

// router.get('/search/:autor', userController.get); //listar livro pelo autor

// router.get('/search/:editor', userController.get); //listar livro pela editora

// router.delete('/deleteUder/:id_user', userController.delete); //deletar usuario

// router.create('/createBook', userController.create); //inserir novo livro

// router.patch('/edit/:id_livro', userController.patch); //atualizar dados dos livros

// router.delete('/deleteBook/:id_livro', userController.delete); //deletar um livro

// router.post('');

}
