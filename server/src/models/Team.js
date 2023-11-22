const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define('Team', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(64)
        }
    },{
        timestamps: false
    });
}