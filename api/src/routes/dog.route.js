const router = require('express').Router()
const { getDogApi, getDogBD, getDogByNameAPI, getDogByNameBD } = require('../controllers/dogs.controller')

router.get('/', async (req, res) => {
  const { name } = req.query
  try {
    if (name) {
      const dogsOfApi = await getDogByNameAPI(name)
      const dogsOfBD = await getDogByNameBD(name)

      if (!dogsOfBD.length && !dogsOfApi.length) {
        return res.status(404).send({ message: 'Dog not found' })
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
