const {response, request} = require('express')
const {User} = require('../models/persona');
const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/generar_jwt')


const pruebaGet = (req, res = response) => {


    const query = req.query;

    console.log("Este es el usuario que se anadio en el mid: ", req.usuario)


    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page=1, limit=10} = req.query;


    //res.send('Hello World')
    User.findAll()
    .then(users => {
      console.log('Usuarios encontrados:', users);
      return res.json(users)
    })
    .catch(err => {
      console.error('Error al obtener usuarios:', err);
    });

    
}

const userByIdGet = (req = request, res = response) => {

    const userId = req.params.userId

    User.findByPk(userId).then(user => {

        if (user){
            res.json(user)
        } else {
            return res.status(404).send('usuario no encontrado')
        }

    })
    .catch(error => {
        console.error('Error al obtener usuario:', error);
        return res.status(500).send('Error al obtener usuario')
    })  
    

}

const userByActive = (req = request, res = response) => {

    User.findAll({where: {
        activo: 1
    
    }}).then(users => {
        console.log(users)
        return res.json(users)
    
    }).catch(error => {
        console.error('Error al obtener usuarios');
    })

}

const userByDeactive = (req = request, res = response) => {

    User.findAll({where: {
        activo: 0
    
    }}).then(users => {
        console.log(users)
        return res.json(users)
    
    }).catch(error => {
        console.error('Error al obtener usuarios');
    })

}

const userPost = async (req = request, res = response) => {

    const {user, password, email} = req.body

    try {
        // Verificar que la contraseña sea una cadena
        if (typeof password !== 'string') {
            console.log(password)
            return res.status(400).json({ message: 'La contraseña debe ser una cadena de texto' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Generar un hash para la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear el nuevo usuario con la contraseña hasheada
        const newUser = await User.create({
            usuario: user,
            passwor: hashedPassword,
            email: email
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }


}

const userDelete = async (req = request, res = response) => {
    console.log("entre")
    const {userId} = req.params

    try {
        const existingUser = await User.findByPk(userId)

        if (!existingUser) {

            return res.status(404).json({ok: false, msg: 'No se existe ese usuario'})

        }

        await existingUser.destroy()

        res.json({ok:true, usuario: existingUser})

    } catch (error) {
        console.error(error)
        res.status(500).json({ok:false, msg: 'Error borrando usuario', err: error})
    }

}

const logIn = async (req = request, res = response) => {

    
    const {passwordUser, email} = req.body

    try {
        const existingUser = await User.findOne({where: {email: email}})

        if (existingUser) {

            const ismatch = await bcrypt.compare(passwordUser, existingUser.passwor)

            if (ismatch) {

                console.log("id: ",existingUser.id)
                const token = await generarJWT(existingUser.id)

                console.log(token);
                

                return res.status(200).json({ok: true, message: "Se inicio sesion", token: token})

            }else {

                return res.status(400).json({ok: false, message: "Credenciales erroneas"})

            }

        } else {
            return res.status(400).json({ok: false, message: "Credenciales erroneas"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ok:false, msg: 'Error logeando usuario', err: error})
    }

}


module.exports = {
    pruebaGet,
    userByIdGet,
    userByActive,
    userByDeactive,
    userPost,
    userDelete,
    logIn
}
