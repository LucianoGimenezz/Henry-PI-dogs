const { Dogs, Temperaments } = require('../db')
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

const formmatter = new Formatter()

const getDogApi = async () => {
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
  try {
    const dogResponse = await Dogs.findAll({
      include: Temperaments
    })
    formmatter.setDB(dogResponse)
    return formmatter.dataFormatterDB()
  } catch (error) {
    throw new Error(error)
  }
}

const getDogByNameAPI = async (name) => {
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
  try {
    const response = await Dogs.findAll({
      where: {
        name: {
          [Op.iRegexp]: nameDog
        }
      },
      include: Temperaments
    })
    formmatter.setDB(response)
    return formmatter.dataFormatterDB()
  } catch (error) {
    throw new Error(error)
  }
}

const getDogByIdAPI = async (id) => {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await response.json()

    const dog = data.find((item) => item.id === parseInt(id))
    formmatter.setAPI([dog])
    return formmatter.dataFormatterApi()
  } catch (error) {
    throw new Error(error)
  }
}

const getDogByIdBD = async (id) => {
  try {
    const data = await Dogs.findAll({
      where: {
        id
      },
      include: Temperaments
    })
    formmatter.setDB(data)
    return formmatter.dataFormatterDB()
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getDogApi,
  getDogBD,
  getDogByNameAPI,
  getDogByNameBD,
  getDogByIdAPI,
  getDogByIdBD
}
