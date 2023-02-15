const { Dogs } = require('../db')
const { Op } = require('sequelize')
const Formatter = require('../helpers/Formatter')

// TODO modificar el objeto que devuelven las peticiones
/**
  Formato de los objetos
  - ID
  - Name
  - image
  - life_span
  - weight
  - height
 */

const getDogApi = async () => {
  const formmatter = new Formatter()
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await response.json()
    formmatter.setAPI(data)
    return formmatter.dataFormatterApi()
  } catch (error) {
    throw new Error(error)
  }
}

const getDogBD = async () => {
  const formmatter = new Formatter()
  try {
    const dogResponse = await Dogs.findAll()
    formmatter.setDB(dogResponse)
    return formmatter.dataFormatterDB()
  } catch (error) {
    throw new Error(error)
  }
}

const getDogByNameAPI = async (name) => {
  const formmatter = new Formatter()
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const dogs = await response.json()
    const filteredDogs = dogs.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase())
    })
    formmatter.setAPI(filteredDogs)
    return formmatter.dataFormatterApi()
  } catch (error) {
    throw new Error(error)
  }
}

const getDogByNameBD = async (nameDog) => {
  const formmatter = new Formatter()
  try {
    const response = await Dogs.findAll({
      where: {
        name: {
          [Op.iRegexp]: nameDog
        }
      }
    })
    formmatter.setDB(response)
    return formmatter.dataFormatterDB()
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getDogApi,
  getDogBD,
  getDogByNameAPI,
  getDogByNameBD
}
