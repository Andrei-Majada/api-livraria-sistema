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
            Pedido.hasMany(models.User, {
            foreignKey: 'id_cliente',
            allowNull: false,
            as: 'User',
        });
    };

    return Pedido;
};