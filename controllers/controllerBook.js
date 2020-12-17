const Book = require('../models').Book;
const Controla = require('../models').Controla;
const Pedido = require('../models').Pedido;
const ItemPedido = require('../models').ItemPedido;

module.exports = {
    
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
            .then(book => {
                Controla.create({
                    id_funcionario: req.session.userId,
                    id_livro: book.id
                })
                .then(controla => {
                    res.status(201).send(book)

                })
            })
            .catch(err => res.status(400).send(err));
    },

    listBooks(req,res,next) {
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

    editBook(req,res,next) {
        Book.findOne({
            where: {
                id: req.params.id_livro
            }
        })
        .then(book => {
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

    deleteBook(req,res,next) {
       return Book.findOne({
            where: {
                id: req.params.id_livro
            }
        })
        .then(book => {
            if (book == null) {
                return res.status(400).json({
                    "error": "Something went wrong"
                })
            }
            book.destroy();
 
            return res.status(200).json({
                "message": "book deleted"
            })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
    },

    listIndisp(req,res,next) {
        return Book.findAll({
            where: {
                disponivel: 0
            }
        })
        .then((book) => {
            if (book == null) {
                return res.status(404).send({
                    msg: "nenhum livro encontrado"
                });
            }
            return res.status(302).send(book);
        })
        .catch(err => res.status(400).send(err));
    },

    adicionarAoCarrinho(req,res,next) {
        return Pedido.findOne({
            where: {
                id_cliente: req.session.userId
            }
        })
        .then(carrinho => {
            console.log("chegou aqui", carrinho);
            if (carrinho == null) {
                Pedido.create({
                    id_cliente: req.session.userId,
                    valorTotal: 0,
                    dataCompra: new Date()
                })
                .then(pedido => {
                    console.log("chegou aqui 2", pedido);
                    ItemPedido.create({
                        id_livro: req.body.id_livro,
                        id_pedido: pedido.id,
                        quantidade: req.body.quantidade
                    })
                    .then(itempedido => res.status(201).send(itempedido))
                    .catch(err => res.status(400).send({ msg: "Nao foi possivel adicionar ao carrinho!"}));
                })
                .catch(err => res.status(400).send(err));
            } else {
                console.log("chegou aqui 3");
                ItemPedido.create({
                    id_livro: req.body.id_livro,
                    id_pedido: carrinho.id,
                    quantidade: req.body.quantidade
                })
                .then(itempedido => res.status(201).send(itempedido))
                .catch(err => res.status(400).send({ msg: "Nao foi possivel adicionar ao carrinho!"}));
            }
        })
        .catch(err => res.status(400).send(err));
    },
    finalizarCompra(req,res) {
        return Pedido.findOne({
            where: {
                id_cliente: req.session.userId
            }
        })
        .then(pedidoFinal => {
            if (pedidoFinal == null) {
                return res.status(404).send({
                    msg: "Você ainda não adicionou nenhum item ao carrinho!"
                });
            } 
    
            ItemPedido.findAll({
                where: {
                    id_pedido: pedidoFinal.id
                }
            }).then(carrinho => {
                let valorFinal = 0;

                for (let i = 0; i < carrinho.length; i++) {
                    Book.findOne({
                        where: {
                            id: carrinho[i].id_livro
                        }
                    }).then(livro => {
                        valorFinal = valorFinal + (livro.preco * carrinho[i].quantidade);
                        pedidoFinal.valorTotal = valorFinal;
                        pedidoFinal.save();
                    })
                }
                deleteCarrinho(pedidoFinal);
                pedidoFinal.dataCompra = new Date();
                pedidoFinal.save();
                res.status(200).send(`Compra no valor de ${pedidoFinal.valorTotal} realizada com sucesso`)
            })
            .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
    }
}

function deleteCarrinho(pedidoFinal) {
    console.log('chegnado')
    ItemPedido.findAll({
        where: {
            id_pedido: pedidoFinal.id
        }
    }).then(carrinho => {
        for (let i = 0; i < carrinho.length; i++) {
            carrinho[i].destroy();
        }
    })
    .catch(err => res.status(400).send(err));
}