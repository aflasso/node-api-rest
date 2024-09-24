const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/persona');


const validarJWT =  (token) => {

    return new Promise((resolve, reject) => {
        
        jwt.verify(token, process.env.SECRETKEY, (err, decode) => {

            if (err) {
                console.error('Error al verificar el token: ', err.message);
                reject('Token no valido')
            } else {
                resolve(decode)
            }

        })
        
    }) 
}

const authenticate = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({msg: 'No hay token en la peticion...'})
    }

    try {
        
        const {id, rol} = await validarJWT(token)

        const usuario = await User.findByPk(id)

        if (!usuario) {

            return res.status(401).json({msg: 'Token no valido - usuario no existe en BD'})

        }

        if (!usuario.activo) {
            return res.status(401).json({msg:"Token no valido - usuario con estado: false"})
        }

        req.usuario = usuario

        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({msg: 'Token no valido'})
    }

}

module.exports = {validarJWT, authenticate}