const axios = require ('axios')
const {Type} = require ('../db')

const getTypePokemon = async () => {
    const typesInDB = await Type
    if (typesInDB.length === 0) {
        // Si la base de datos está vacía, obtén los tipos desde la API
        const response = await axios.get('https://pokeapi.co/api/v2/type');
  
        if (response.status === 200) {
          // Extrae los tipos de la respuesta de la API
          const types = response.data.results.map((type) => type.name);
  
          // Guarda los tipos en la base de datos
          await Type.saveTypes(types); // Reemplaza con tu función para guardar tipos en la base de datos
  
          return types;
        } else {
          throw new Error('Error al obtener tipos desde la API');
        }
      } else {
        // Si ya tienes tipos en la base de datos, simplemente devuélvelos
        return typesInDB;
      }
}

module.exports = {
    getTypePokemon
}