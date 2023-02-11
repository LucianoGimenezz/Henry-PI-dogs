/* eslint-disable no-undef */
const { conn, Temperaments } = require('../../../src/db')

describe('Modelo Temperaments', () => {
  beforeAll(async () => {
    await conn.sync({ force: true })
  })

  test('Temperaments debe existir', () => {
    const temperaments = conn.models.Temperaments
    expect(temperaments).toBeDefined()
  })

  test('Debe contener las siguientes propiedades', async () => {
    const temperament = Temperaments.build({
      name: 'Friendly'
    })
    const attributes = ['id', 'name']
    expect(Object.keys(temperament.toJSON())).toEqual(attributes)
  })

  test('name no puede ser null', async () => {
    try {
      await Temperaments.create({})
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })
})
