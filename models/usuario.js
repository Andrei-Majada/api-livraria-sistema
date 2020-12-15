// var bcrypt = require("bcrypt");
var bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Please enter your name'
                    },
                    len: [5, 60]
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                },
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                len: [8, 15]
            },
            document: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            dateBirth: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            CEP: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            houseNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            complement: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {});

    // User.associate = function (models) {
    //     User.hasMany(models.Job, {
    //         foreignKey: 'userId',
    //         allowNull: false,
    //         as: 'users',
    //     });
    //     User.hasMany(models.Sessions, {
    //         foreignKey: 'userId',
    //         allowNull: false,
    //         as: 'tokens',
    //     });
    // };

    // User.prototype.validPassword = function (password) {
    //     return bcrypt.compareSync(password, this.password);
    // };

    return User;
};