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
            complemento: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dataAdmissao: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            filial: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {});

    User.associate = function (models) {
        User.hasMany(models.Sessions, {
            foreignKey: 'userId',
            allowNull: false,
            as: 'tokens',
        });
    };

    
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};
/*
{
    "name": "Andrei Schneider Majada",
    "email": "andreimajada@gmail.com",
    "password": "andrei10",
    "phoneNumber": "91473935",
    "document": "04335193041",
    "dateBirth": "1999-03-05",
    "isAdmin": 1,
    "CEP": 96075810,
    "state": "RS",
    "city": "Pelotas",
    "street": "luis otavio",
    "houseNumber": 1962,
    "complement": null,
    "dataAdmissao": "2019-10-10",
    "filial": "nilopolis"
}

{
    "id": 1,
    "name": "Caroline de Souza Evangelista",
    "email": "caroline@gmail.com",
    "password": "$2b$10$IvH/iV3WqexnfRT.B/fcieOmsaWpTXMseSMDUavfgSlAI/uMAdgaC",
    "phoneNumber": "84326265",
    "document": "15871239757",
    "dateBirth": "1997-12-09T00:00:00.000Z",
    "isAdmin": 1,
    "CEP": 96075810,
    "state": "RS",
    "city": "Pelotas",
    "street": "apolo afonso",
    "houseNumber": 2100,
    "dataAdmissao": "2019-10-10T00:00:00.000Z",
    "filial": "nilopolis",
}
*/