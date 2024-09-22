const {Router} = require('express')

const {pokemonGet, pokemonGetOne, pokemonPost, pokemonPut, pokemonDelete} = require('../controller/pokemonController')
const { route } = require('./pruebaRoute')



const router = Router()

router.get('/', pokemonGet)

router.get('/:pokemonId', pokemonGetOne)

router.post('/new', pokemonPost)

router.put('/update', pokemonPut)

router.delete('/delete/:pokemonId', pokemonDelete)

module.exports = router