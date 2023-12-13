const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(64)
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING(64)
    },
    birthdate: {
      type: DataTypes.STRING
    }
  });
};