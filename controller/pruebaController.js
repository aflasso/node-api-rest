const {response, request} = require('express')
const {User} = require('../models/persona');
const { where } = require('sequelize');


const pruebaGet = (req, res = response) => {


    const query = req.query;


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

    User.findOne({where: {email: email}})
        .then(existingUser => {
            if (existingUser) {
                console.log('El usuario ya existe')
                res.status(400).json({ message: 'El usuario ya existe' });
            } else {

                return User.create({

                    usuario: user,
                    passwor: password,
                    email: email
    
                });
            }
        })
        .then(newUser => {

            if (newUser) {
                console.log(newUser)
                return res.status(201).json(newUser);   
            }
        })
        .catch(error => {
            console.error('Error al crear el usuario:', error);
            return res.status(500).json({ message: 'Error al crear el usuario' });
        });


}

const userDelete = async (req = request, res = response) => {

    const {id} = req.params

    try {
        const existingUser = await User.findByPk(id)

        if (!existingUser) {

            return res.status(404).json({ok: false, msg: 'No se existe ese usuario'})

        }

        await existingUser.update({activo: 0})

        res.json({ok:true, usuario: existingUser})

    } catch (error) {
        console.error(error)
        res.status(500).json({ok:false, msg: 'Error borrando usuario', err: error})
    }

}


module.exports = {
    pruebaGet,
    userByIdGet,
    userByActive,
    userByDeactive,
    userPost,
    userDelete
}
