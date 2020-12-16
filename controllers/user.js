 
const User = require('../models').User;
const Book = require('../models').Book;
const Sessions = require('../models').Sessions;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {cpf} = require('cpf-cnpj-validator');
const {cnpj} = require('cpf-cnpj-validator');

module.exports = {
    createUser(req, res, next) {
        if (cpf.isValid(req.body.document) || cnpj.isValid(req.body.document)) {
            return User
                .create({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, saltRounds),
                    phoneNumber: req.body.phoneNumber,
                    document: req.body.document,
                    dateBirth: req.body.dateBirth,
                    isAdmin: req.body.isAdmin,
                    CEP: req.body.CEP,
                    state: req.body.state,
                    city: req.body.city,
                    street: req.body.street,
                    houseNumber: req.body.houseNumber,
                    complemento: req.body.complemento,
                    dataAdmissao: req.body.dataAdmissao,
                    filial: req.body.filial
                })
                .then(user => res.status(201).send(user))
                .catch(err => res.status(400).send(err));
        }
        return res.status(400).json({
            "error": "Invalid document"
        });
    },

    index(req, res, next) {
        return res.status(200).json({
            "msg": "OK"
        });
    },

    createBook(req,res,next) {
        if (req.session.admin != 1) {
            return res.status(401).json({
                error: "You don't have permission to access the page you're trying to access"
            })
        }
        
        return Book
                .create({
                title: req.body.title,
                autor: req.body.autor,
                preco: req.body.preco,
                linkImagem: req.body.linkImagem,
                quantidade: req.body.quantidade,
                editora: req.body.editora,
                categoria: req.body.categoria,
                disponivel: req.body.disponivel
            })
            .then(book => res.status(201).send(book))
            .catch(err => res.status(400).send(err));
    },

    listBooks(req,res,next) {
        console.log('errou');
        return Book
            .findAll({})
                .then(book => res.status(302).send(book))
                .catch(err => res.status(400).send(err));
    },
    
    listBooksTitle(req,res,next) {
        return Book.findOne({
            where: {
                title: req.params.title
            }
        })
            .then((book) => {
                if (book == null) {
                    return res.status(404).send({
                        msg: "Livro nao encontrado"
                    });
                }
                return res.status(302).send(book);
            })
            .catch(err => res.status(400).send(err));
    }, 
    
    listBooksCat(req,res,next) {
        return Book.findAll({
            where: {
                categoria: req.params.categoria
            }
        })
            .then((book) => {
                if (book == null) {
                    return res.status(404).send({
                        msg: "Livro nao encontrado"
                    });
                }
                return res.status(302).send(book);
            })
            .catch(err => res.status(400).send(err));
    }, 
    listBooksAutor(req,res,next) {
        return Book.findAll({
            where: {
                autor: req.params.autor
            }
        })
            .then((book) => {
                if (book == null) {
                    return res.status(404).send({
                        msg: "Livro nao encontrado"
                    });
                }
                return res.status(302).send(book);
            })
            .catch(err => res.status(400).send(err));
    }, 
    
    listBooksEdit(req,res,next) {
        return Book.findAll({
            where: {
                editora: req.params.editora
            }
        })
            .then((book) => {
                if (book == null) {
                    return res.status(404).send({
                        msg: "Livro nao encontrado"
                    });
                }
                return res.status(302).send(book);
            })
            .catch(err => res.status(400).send(err));
    },

    editLivro(req,res,next) {
        Book.findOne({
            where: {
                id: req.params.id_livro
            }
        })
        .then(book => {
            console.log(book)
            book.title = req.body.title;
            book.autor = req.body.autor;
            book.preco = req.body.preco;
            book.linkImagem = req.body.linkImagem;
            book.quantidade = req.body.quantidade;
            book.editora = req.body.editora;
            book.categoria = req.body.categoria;
            book.disponivel = req.body.disponivel;
            book.save();
            res.status(200).send(book);    
        })
        .catch(err => res.status(400).send(err));
    },

    login(req, res) {
        console.log("requisição", req.body)
        if (req.body.email && req.body.password) {
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(function (user) {
                console.log('usuario', user);
                if (!user || !user.validPassword(req.body.password)) {
                    return res.json({
                        "error": "Incorrect email or password."
                    });
                }
                console.log('session', user.id)

                Sessions.create({
                    token: bcrypt.hashSync(user.email + user.id + new Date().getTime().toString(), saltRounds),
                    userId: user.id
                })
                    .then(session => {
                        return res.status(200).json({token: session.token});
                    })
                    .catch(() => res.status(400).json({
                        "error": "Erro ao iniciar sessão"
                    })
                    );
            }).catch(() => res.status(400).json({
                    "error": "Incorrect credentials"
                })
            );
        }
    },

    logout(req, res) {
        Sessions.destroy({
            where: {
                userId: req.session.userId
            }
        });

        req.session.destroy();

        return res.status(401).json({
            message: "You have been logged out"
        })
    }
}