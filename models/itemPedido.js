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

        // ItemPedido.associate = function (models) {
        //     ItemPedido.belongsTo(models.Pedido, {
        //         foreignKey: 'id_pedido',
        //         allowNull: false,
        //         onDelete: 'CASCADE',
        //         as: 'pedidos'
        //     });

        //     ItemPedido.belongsTo(models.Book, {
        //         foreignKey: 'id_livro',
        //         allowNull: false,
        //         onDelete: 'CASCADE',
        //         as: 'item'
        //     });
        // };

    return ItemPedido;
};