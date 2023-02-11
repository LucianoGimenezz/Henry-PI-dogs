/* eslint-disable no-undef */
const { Dogs, conn } = require('../../../src/db.js')

describe('Modelo Dogs', () => {
  beforeAll(async () => {
    await conn.sync({ force: true })
  })

  test('Dog debe existir', () => {
    const Dog = conn.models.Dogs
    expect(Dog).toBeDefined()
  })

  test('Debe contener las propiedades correctas', async () => {
    const dog = Dogs.build({
      name: 'Boxer',
      image: 'example.jpg',
      life_span: '8 - 12',
      weight: '14 - 64',
      height: '23 - 33'
    })
    const attributes = ['id', 'name', 'image', 'life_span', 'weight', 'height']
    expect(Object.keys(dog.toJSON())).toEqual(attributes)
  })

  test('La propiedad name no puede ser null', async () => {
    try {
      await Dogs.create({
        image: 'example.jpg',
        life_span: '8 - 12',
        weight: '14 - 64',
        height: '23 - 33'
      })
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  test('La propiedad image no puede ser null', async () => {
    try {
      await Dogs.create({
        name: 'Boxer',
        life_span: '8 - 12',
        weight: '14 - 64',
        height: '23 - 33'
      })
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  test('La propiedad life_span no puede ser null', async () => {
    try {
      await Dogs.create({
        name: 'Boxer',
        image: 'example.jpg',
        weight: '14 - 64',
        height: '23 - 33'
      })
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  test('La propiedad weight no puede ser null', async () => {
    try {
      await Dogs.create({
        name: 'Boxer',
        image: 'example.jpg',
        life_span: '8 - 12',
        height: '23 - 33'
      })
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  test('La propiedad height no puede ser null', async () => {
    try {
      await Dogs.create({
        name: 'Boxer',
        image: 'example.jpg',
        life_span: '8 - 12',
        weight: '14 - 64'
      })
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })
})
