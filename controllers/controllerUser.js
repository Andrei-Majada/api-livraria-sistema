const User = require('../models').User;
const Book = require('../models').Book;
const Sessions = require('../models').Sessions;
const Controla = require('../models').Controla;
// const Pedido = require('../models').Pedido;
// const ItemPedido = require('../models').ItemPedido;
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

    login(req, res) {
        if (req.body.email && req.body.password) {
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(function (user) {
                if (!user || !user.validPassword(req.body.password)) {
                    return res.json({
                        "error": "Incorrect email or password."
                    });
                }

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