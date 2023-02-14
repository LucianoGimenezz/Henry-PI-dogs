const { Dogs } = require('../db')
const { Op } = require('sequelize')

const getDogApi = async () => {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

const getDogBD = async () => {
  try {
    const dogResponse = await Dogs.findAll()
    return dogResponse
  } catch (error) {
    throw new Error(error)
  }
}

const getDogByNameAPI = async (name) => {
  try {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    const dogs = await response.json()
    return dogs
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
      }
    })
    return response
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
