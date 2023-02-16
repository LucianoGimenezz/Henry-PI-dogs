/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../src/app')
const agent = request(app)
const { conn, Temperaments, Dogs } = require('../../src/db')

describe('Route GET /dogs', () => {
  test('La ruta /dogs debe traer todos los perros, de la API y la BD', async () => {
    const res = await agent.get('/dogs')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  test('La ruta /dogs puede recibir una query name y debe devolver todos los perros que coincidan con dicha query', async () => {
    const res = await agent.get('/dogs?name=hunting')
    const dog = [
      {
        id: 3,
        name: 'African Hunting Dog',
        image: 'https://cdn2.thedogapi.com/images/rkiByec47.jpg',
        life_span: '11 years',
        weight: ['20', '30'],
        height: ['76'],
        temperaments: ['Wild', 'Hardworking', 'Dutiful']
      }
    ]
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(dog)
  })

  test('La ruta /dogs debe devolver un error si no se encuentra el perro enviado por query', async () => {
    const res = await agent.get('/dogs?name=gato')
    expect(res.statusCode).toBe(404)
    expect(res.body.error).toBeDefined()
  })
})

describe('Route GET /dogs:id', () => {
  let uuid
  beforeAll(async () => {
    const temperaments = ['Friendly', 'Loyal', 'Intelligent', 'Loving']
    const temperamentsId = []
    await conn.sync({ force: true })
    const dogCreated = await Dogs.create({
      name: 'Boxer',
      image: 'example.jpg',
      life_span: '6 - 10',
      weight: '5 - 8',
      height: '20 - 10'
    })
    uuid = dogCreated.id
    for (let i = 0; i < temperaments.length; i++) {
      const [temperament, created] = await Temperaments.findOrCreate({
        where: { name: temperaments[i] }
      })
      if (created) temperamentsId.push(temperament.id)
    }
    dogCreated.addTemperaments(temperamentsId)
  })

  test('La ruta GET /dogs/:id debe retornar el perro que coincida con el id recibido por parametro', async () => {
    const dogExpectedForBD = {
      id: uuid,
      name: 'Boxer',
      image: 'example.jpg',
      life_span: '6 - 10',
      weight: ['5', '8'],
      height: ['20', '10'],
      temperaments: ['Friendly', 'Loyal', 'Intelligent', 'Loving']
    }
    const dogExpectedForApi = {
      id: 1,
      name: 'Affenpinscher',
      image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
      life_span: '10 - 12 years',
      weight: ['3', '6'],
      height: ['23', '29'],
      temperaments: ['Stubborn', 'Curious', 'Playful', 'Adventurous', 'Active', 'Fun-loving']
    }
    const resForApi = await agent.get('/dogs/1')
    const resForBD = await agent.get(`/dogs/${uuid}`)
    expect(resForBD.statusCode).toBe(200)
    expect(resForBD.body[0]).toEqual(dogExpectedForBD)
    expect(resForApi.statusCode).toBe(200)
    expect(resForApi.body[0]).toEqual(dogExpectedForApi)
  })
})
