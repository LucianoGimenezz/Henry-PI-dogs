/* eslint-disable no-undef */
const { getDogApi, getDogBD, getDogByNameAPI, getDogByNameBD } = require('../../src/controllers/dogs.controller')
const { Dogs, conn } = require('../../src/db')

describe('Dog Controller API', () => {
  let dogs
  let dogsByName
  beforeAll(async () => {
    // Llamada para testear el controller getDogApi
    const res = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await res.json()
    dogs = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image?.url,
        life_span: item.life_span,
        weight: item.weight.metric,
        height: item.height.metric
      }
    })

    // Llamada para testear el controller getDogByNameAPI
    dogsByName = dogs.filter((item) => {
      return item.name.toLowerCase().includes('dog')
    })
  })

  test('getDogApi debe retornar un arreglo con los perros de la API', async () => {
    const data = await getDogApi()
    expect(data).toEqual(dogs)
    expect(data.length).toBe(dogs.length)
  })

  test('getDogByNameAPI, debe traer los perros de la API que coincidan con el name recibido por parametro ', async () => {
    const data = await getDogByNameAPI('dog')
    expect(data).toEqual(dogsByName)
  })
})

describe('Dog Controller DB', () => {
  beforeAll(async () => {
    await conn.sync({ force: true })
    await Dogs.create({
      name: 'Boxer',
      image: 'example.jpg',
      life_span: '6 - 10',
      weight: '5 - 8',
      height: '20 - 10'
    })

    await Dogs.create({
      name: 'African Hunting Dog"',
      image: 'example.jpg',
      life_span: '6 - 10',
      weight: '5 - 8',
      height: '20 - 10'
    })

    await Dogs.create({
      name: 'Akbash Dog',
      image: 'example.jpg',
      life_span: '6 - 10',
      weight: '5 - 8',
      height: '20 - 10'
    })
  })

  test('getDogBD debe traer los perros de la base de datos', async () => {
    const responseDB = await Dogs.findAll()
    const responseFormatted = responseDB.map((item) => {
      return {
        id: item.dataValues.id,
        name: item.dataValues.name,
        image: item.dataValues.image,
        life_span: item.dataValues.life_span
      }
    })
    const responseController = await getDogBD()
    expect(responseController.length).toBe(3)
    expect(responseController).toEqual(responseFormatted)
  })

  test('getDogByNameBD debe traer los perros que concidan con el nombre recibido por parametro', async () => {
    const responseController = await getDogByNameBD('dog')
    const responseController2 = await getDogByNameBD('boxer')
    expect(responseController.length).toBe(2)
    expect(responseController2.length).toBe(1)
  })
})
