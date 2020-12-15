 
const User = require('../models').User;
const Book = require('../models').Book;
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
                    complement: req.body.complement
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
        return Book
                .create({
                title: req.body.title,
                autor: req.body.autor,
                preco: req.body.preco,
                linkImagem: req.body.linkImagem,
                quantidade: req.body.quantidade,
                editora: req.body.editora,
                categoria: req.body.categoria
            })
            .then(book => res.status(201).send(book))
            .catch(err => res.status(400).send(err));
    }
}
