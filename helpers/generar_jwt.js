const { request, response } = require('express')
const jwt = require('jsonwebtoken')


const generarJWT = (user) => {

    return new Promise((resolve, reject) => {

        const {id, role} = user
 
        jwt.sign({id, role}, process.env.SECRETKEY, {expiresIn: '4h'}, (err, token) => {

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