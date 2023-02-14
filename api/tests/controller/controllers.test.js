/* eslint-disable no-undef */
const { getDogApi, getDogBD, getDogByNameAPI, getDogByNameBD } = require('../../src/controllers/dogs.controller')
const { Dogs, conn } = require('../../src/db')

describe('Dog Controller API', () => {
  const dogs = []
  const dogsByName = []
  beforeAll(async () => {
    // Llamada para testear el controller getDogApi
    const res = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await res.json()
    dogs.push(...data)
    // Llamada para testear el controller getDogByNameAPI
    const resByName = await fetch('https://api.thedogapi.com/v1/breeds/search?q=dog')
    const dogsMatched = await resByName.json()
    dogsByName.push(...dogsMatched)
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
    const responseController = await getDogBD()
    expect(responseController.length).toBe(3)
    expect(responseController).toEqual(responseDB)
  })

  test('getDogByNameBD debe traer los perros que concidan con el nombre recibido por parametro', async () => {
    const responseController = await getDogByNameBD('dog')
    const responseController2 = await getDogByNameBD('boxer')
    expect(responseController.length).toBe(2)
    expect(responseController2.length).toBe(1)
  })
})
