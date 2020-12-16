module.exports = (sequelize, DataTypes) => {
    const ItemPedido = sequelize.define('ItemPedido', {
        id_livro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_pedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
        },
        {});

        ItemPedido.associate = function (models) {
            ItemPedido.hasMany(models.Pedido, {
            foreignKey: 'id_pedido',
            allowNull: false,
            as: 'Pedido'
            });
        };
        ItemPedido.associate = function (models) {
            ItemPedido.hasMany(models.Book, {
            foreignKey: 'id_livro',
            allowNull: false,
            as: 'Book'
            });
        };

    return ItemPedido;
};