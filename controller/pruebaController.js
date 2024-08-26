const {response, request} = require('express')
const {User} = require('../models/persona')


const pruebaGet = (req, res = response) => {


    const query = req.query;


    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page=1, limit=10} = req.query;


    //res.send('Hello World')
    User.findAll()
    .then(users => {
      console.log('Usuarios encontrados:', users);
      res.json(users)
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
            res.status(404).send('usuario no encontrado')
        }

    })
    .catch(error => {
        console.error('Error al obtener usuario:', error);
        res.status(500).send('Error al obtener usuario')
    })  
    

}


module.exports = {
    pruebaGet,
    userByIdGet
}
