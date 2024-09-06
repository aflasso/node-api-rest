const { request, response } = require('express')
const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = {uid}

        jwt.sign(payload, process.env.SECRETKEY, {expiresIn: '4h'}, (err, token) => {

            if (err){
                console.error('Token no válido: ', err.message);
                reject('No se pudo generar el token')
            }else {
                console.log('Token válido, datos decodificados: ', token)
                resolve(token)
            }
        })

    })

}


module.exports = {generarJWT}