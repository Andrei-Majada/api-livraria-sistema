module.exports = (sequelize, DataTypes) => {
    const Controla = sequelize.define('Controla', {
        id_funcionario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_livro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

        Controla.associate = function(models) {
            Controla.belongsTo(models.User, {
              foreignKey: 'id_funcionario',
              allowNull: false,
              onDelete: 'CASCADE',
              as: 'users',
            });
            Controla.belongsTo(models.Book, {
                foreignKey: 'id_livro',
                allowNull: false,
                onDelete: 'CASCADE',
                as: 'books',
            });
        };
        
    return Controla;
};