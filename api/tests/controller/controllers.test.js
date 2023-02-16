/* eslint-disable no-undef */
const { getDogApi, getDogBD, getDogByNameAPI, getDogByNameBD } = require('../../src/controllers/dogs.controller')
const getAllTemperaments = require('../../src/controllers/temperaments.controller')
const { Dogs, conn, Temperaments } = require('../../src/db')

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
        weight: item.weight.metric?.split('-'),
        height: item.height.metric?.split('-'),
        temperaments: item.temperament?.split(',')
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
    expect(Array.isArray(data[0].weight)).toBe(true)
    expect(Array.isArray(data[0].height)).toBe(true)
    expect(Array.isArray(data[0].temperaments)).toBe(true)
  })

  test('getDogByNameAPI, debe traer los perros de la API que coincidan con el name recibido por parametro ', async () => {
    const data = await getDogByNameAPI('dog')
    expect(data).toEqual(dogsByName)
  })
})

describe('Dog Controller DB', () => {
  beforeAll(async () => {
    const temperaments = ['Friendly', 'Loyal', 'Intelligent', 'Loving']
    const temperamentsId = []
    await conn.sync({ force: true })
    const dog1 = await Dogs.create({
      name: 'Boxer',
      image: 'example.jpg',
      life_span: '6 - 10',
      weight: '5 - 8',
      height: '20 - 10'
    })

    const dog2 = await Dogs.create({
      name: 'African Hunting Dog"',
      image: 'example.jpg',
      life_span: '6 - 10',
      weight: '5 - 8',
      height: '20 - 10'
    })

    const dog3 = await Dogs.create({
      name: 'Akbash Dog',
      image: 'example.jpg',
      life_span: '6 - 10',
      weight: '5 - 8',
      height: '20 - 10'
    })

    for (let i = 0; i < temperaments.length; i++) {
      const [temperament, created] = await Temperaments.findOrCreate({
        where: { name: temperaments[i] }
      })
      if (created) temperamentsId.push(temperament.id)
    }
    await dog1.addTemperaments(temperamentsId)
    await dog2.addTemperaments(temperamentsId)
    await dog3.addTemperaments(temperamentsId)
  })

  test('getDogBD debe traer los perros de la base de datos', async () => {
    const responseDB = await Dogs.findAll({
      include: Temperaments
    })
    const responseFormatted = responseDB.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image,
        life_span: item.life_span,
        weight: item.weight.split('-'),
        height: item.height.split('-'),
        temperaments: item.temperaments.map((item) => item.name)
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

describe('Temperament controller', () => {
  beforeAll(async () => {
    await conn.sync({ force: true })
  })

  test('getAllTemperament debe guardar en la base de datos todos los temperamentos de la API', async () => {
    await getAllTemperaments()
    const allTemperaments = await Temperaments.findAll()
    expect(allTemperaments.length).toBeGreaterThan(0)
  })
})
