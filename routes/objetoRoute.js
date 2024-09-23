const {Router} = require('express')

const {getObjetos, getOneObjeto, postObjeto, updateObjeto, deleteObjeto} = require('../controller/objetosontroller')
const { Model } = require('sequelize')

const router = Router()

router.get('/', getObjetos)

router.get('/:objetoId', getOneObjeto)

router.post('/new', postObjeto)

router.put('/update', updateObjeto)

router.delete('/delete/:objetoId', deleteObjeto)

module.exports = router