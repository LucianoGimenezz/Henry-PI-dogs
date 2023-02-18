/* eslint-disable camelcase */
const router = require('express').Router()
const {
  getDogApi,
  getDogBD,
  getDogByNameAPI,
  getDogByNameBD,
  getDogByIdAPI,
  getDogByIdBD
} = require('../controllers/dogs.controller')
const { Dogs, Temperaments } = require('../db')
const getAllTemperaments = require('../controllers/temperaments.controller')

router.get('/', async (req, res) => {
  const { name } = req.query
  try {
    if (name) {
      const dogsOfApi = await getDogByNameAPI(name)
      const dogsOfBD = await getDogByNameBD(name)

      if (!dogsOfBD.length && !dogsOfApi.length) {
        return res.status(404).send({ error: 'Dog not found' })
      }
      const concatData = dogsOfApi.concat(dogsOfBD)
      return res.status(200).send(concatData)
    }
    const dogsOfApi = await getDogApi()
    const dogsOfBD = await getDogBD()
    return res.status(200).send(dogsOfApi.concat(dogsOfBD))
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  /*
    Valido primero si el id recibido es un id serial o un UUID
    id --> de tipo Integer
    UUID --> Contiene numeros, letras y guiones e.g: 76670522-66f5-4698-98e1-25fbfe8ed5ec
  */
  try {
    if (/\D/.test(id)) {
      const dog = await getDogByIdBD(id)
      return res.status(200).send(dog)
    }
    const dogApi = await getDogByIdAPI(id)
    return res.status(200).send(dogApi)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  await getAllTemperaments()
  try {
    const { name, image, life_span, height, weight, temperaments } = req.body
    const temperamentsId = []

    if (!name || !life_span || !height || !weight || !temperaments) throw new Error('All fields are required')
    const dogCreated = await Dogs.create({
      name,
      image: image || 'default',
      life_span,
      height,
      weight
    })

    for (const temperament of temperaments) {
      const response = await Temperaments.findOne({
        where: {
          name: temperament
        }
      })
      temperamentsId.push(response.id)
    }

    dogCreated.addTemperaments(temperamentsId)
    return res.status(201).send({ message: 'created', data: dogCreated })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
