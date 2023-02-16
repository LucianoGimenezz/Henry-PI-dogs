const router = require('express').Router()
const getAllTemperaments = require('../controllers/temperaments.controller')
const { Temperaments } = require('../db')

router.get('/', async (req, res) => {
  try {
    await getAllTemperaments()
    const response = await Temperaments.findAll()
    return res.status(200).send(response)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
