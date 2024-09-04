const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = {uid}

        jwt.sign(payload, process.env.SECRETKEY, (err, token) => {

            if (err){
                console.error('Token no válido: ', err.message);

            }else {
                console.log('Token válido, datos decodificados: ', decoded)
                resolve(token)
            }
        })

    })

}

module.exports = generarJWT