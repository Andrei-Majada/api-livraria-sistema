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
            }
        },
        {});

    return Book;
};