/* eslint-disable no-undef */
const { Dog, conn } = require('../../../src/db.js')

describe('Modelo Dog', () => {
  beforeAll(async () => {
    await conn.sync({ force: true })
  })

  test('Dog debe existir', () => {
    const Dog = conn.models.Dog
    expect(Dog).toBeDefined()
  })

  test('Debe contener las propiedades correctas', async () => {
    const dog = Dog.build({
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
      await Dog.create({
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
      await Dog.create({
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
      await Dog.create({
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
      await Dog.create({
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
      await Dog.create({
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
