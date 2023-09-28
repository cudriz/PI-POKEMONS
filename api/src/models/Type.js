
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Type = sequelize.define(
    'Type',
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  // Método personalizado para obtener todos los tipos
  Type.getAllTypes = async () => {
    try {
      const types = await Type.findAll({
        attributes: ['Nombre'], // Obtener solo el campo 'Nombre'
      });
      return types.map((type) => type.Nombre);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Método personalizado para guardar tipos en la base de datos
  Type.saveTypes = async (types) => {
    try {
      // Itera sobre los tipos y crea un registro en la base de datos para cada uno
      await Promise.all(
        types.map(async (typeName) => {
          await Type.create({
            Nombre: typeName,
          });
        })
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return Type;
};
