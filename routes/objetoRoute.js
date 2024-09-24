const {Router} = require('express')

const {getObjetos, getOneObjeto, postObjeto, updateObjeto, deleteObjeto} = require('../controller/objetosontroller')
const { Model } = require('sequelize')
const {validarJWT, authenticate} = require('../middlewares/validarJWT')

const router = Router()

router.get('/', authenticate,getObjetos)

router.get('/:objetoId', authenticate,getOneObjeto)

router.post('/new', authenticate,postObjeto)

router.put('/update', authenticate,updateObjeto)

router.delete('/delete/:objetoId', authenticate,deleteObjeto)

module.exports = router