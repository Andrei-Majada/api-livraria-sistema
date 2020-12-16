module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valorTotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dataCompra: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: true
        },
        });

        Pedido.associate = function (models) {
            Pedido.belongsTo(models.User, {
            foreignKey: 'id_cliente',
            allowNull: false,
            onDelete: 'CASCADE',
            as: 'users',
        });
    };

    return Pedido;
};