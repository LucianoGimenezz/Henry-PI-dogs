/* eslint-disable no-undef */
const { conn } = require('../../src/db')

describe('Conexion a la base de datos', () => {
  test('Debe establecer correctamente la conexion', async () => {
    try {
      await conn.authenticate()
      expect(true).toBe(true)
    } catch (error) {
      expect(error.message).toBeUndefined()
    }
  })

  test('Se debe poder realizar operacion en la base de datos', async () => {
    try {
      await conn.query('SELECT 1 + 1')
      expect(true).toBe(true)
    } catch (error) {
      expect(error.message).toBeUndefined()
    }
  })
})
