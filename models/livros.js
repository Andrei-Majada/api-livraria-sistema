module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            autor: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false
            },
            preco: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            linkImagem: {
                type: DataTypes.STRING,
                allowNull: true
            },
            quantidade: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            editora: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            disponivel: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {});

        Book.associate = function (models) {
            Book.hasMany(models.Controla, {
                foreignKey: 'id_livro',
                allowNull: false,
                as: 'books',
            });

            Book.hasMany(models.ItemPedido, {
                foreignKey: 'id_livro',
                allowNull: false,
                as: 'item'
            });
        };

    return Book;
};

/*
{
    "title": "Harry Potter e o Calice de fogo",
    "autor": "JK, Rowling",
    "preco": 56.9,
    "linkImagem": null,
    "quantidade": 210,
    "editora": "so deus sabe",
    "categoria": "Magia",
    "disponivel": 1
}

disponivel == 1 -> livro disponivel
disponivel == 0 -> livro nao disponivel
*/