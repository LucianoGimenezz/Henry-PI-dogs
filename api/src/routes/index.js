const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const temperamentRoute = require('./temperaments.route')
const dogsRoute = require('./dog.route')

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/temperaments', temperamentRoute)
router.use('/dogs', dogsRoute)

module.exports = router
