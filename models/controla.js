module.exports = (sequelize, DataTypes) => {
    const Controla = sequelize.define('Book', {
        id_funcionario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_livro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Controla.associate = function (models) {
        Controla.belongsTo(models.User, {
            foreignKey: 'id_funcionario',
            allowNull: false,
            onDelete: 'CASCADE',
            as: 'User',
        });
        Controla.hasMany(models.Book, {
            foreignKey: 'id_livro',
            allowNull: false,
            as: 'Book',
        });
    };

    return Controla;
};