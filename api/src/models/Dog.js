const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura_minima: {
      type: DataTypes.STRING,
      allowNull: false
    },
    altura_maxima: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peso_minimo: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    peso_maximo: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    vida_minimo:{
      type: DataTypes.STRING,
      allowNull: true
    },
    vida_maximo:{
      type: DataTypes.STRING,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    creadoEnDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
