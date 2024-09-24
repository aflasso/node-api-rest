const {Router} = require('express')

const {pokemonGet, pokemonGetOne, pokemonPost, pokemonPut, pokemonDelete} = require('../controller/pokemonController')

const {validarJWT, authenticate} = require('../middlewares/validarJWT')



const router = Router()

router.get('/', authenticate,pokemonGet)

router.get('/:pokemonId', authenticate,pokemonGetOne)

router.post('/new',authenticate, pokemonPost)

router.put('/update',authenticate, pokemonPut)

router.delete('/delete/:pokemonId', authenticate,pokemonDelete)

module.exports = router