const axios = require ('axios')
const {Type} = require ('../db')

const getAllTypes = async () => {
  try {
    const types = await Type.findAll({
      attributes: ['Nombre'], 
    });
    return types.map((type) => type.Nombre);
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveTypes = async (types) => {
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

const getTypePokemon = async () => {
    const typesInDB = await getAllTypes();
    
    if (typesInDB.length === 0) {
        // Si la base de datos está vacía, obténgo los tipos desde la API
        const response = await axios.get('https://pokeapi.co/api/v2/type');
  
        if (response.status === 200) {
          // Extrae los tipos de la respuesta de la API
          const types = response.data.results.map((type) => type.name);
  
          // Guardo los tipos en la base de datos
          await saveTypes(types); 
  
          return types;
        } else {
          throw new Error('Error al obtener tipos desde la API');
        }
      } else {
        // Si ya tengo los  tipos en la base de datos, simplemente los devuelvo
        return typesInDB;
      }
}

module.exports = {
    getTypePokemon,

}