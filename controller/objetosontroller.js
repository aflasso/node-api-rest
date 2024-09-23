const {request, response} = require("express")
const Objeto = require("../models/objeto")


const getObjetos = (req = request, res = response) => {

    Objeto.findAll().then((data) => {
        console.log('Objetos totales', data)

        return res.status(200).json({status: 'succes', data: data})
    }).catch(error => {
        console.error('Ocurrio un error al obtener los objetos', error);
        return res.status(500).json({status: 'error', error: error})
    });
}

const getOneObjeto = (req = request, res = response) => {

    const {objetoId} = req.params

    Objeto.findByPk(objetoId).then(data => {

        if (data) {
            console.log('Objeto encontrado', data)

            return res.status(200).json({status: 'succes', data: data})
        }else {
            console.log('No se encontro el objeto');
            return res.status(404).json({status: 'fail', error: 'No se encontro el objeto'})
            
        }

    }).catch(error => {
        console.error("Error al obtener objeto");
        return res.status(500).json({status: 'error', error: error})
    })

}

const postObjeto = async (req = request, res = response) => {

    const {id, nombre, descripcion} = req.body

    try {
        const existObjeto = await Objeto.findByPk(id)

        if (existObjeto) {
            console.log('El objeto ya existe', existObjeto)
            return res.status(400).json({status: 'fail', error: 'El objeto ya existe'})
        }

    }catch(error) {
        console.error('Error al confirmar duplicidad', error);
        return res.status(500).json({status: 'error', error, error})
    }

    try {
        const nuevoObjeto = await Objeto.create({id, nombre, descripcion})

        res.status(201).json({status: 'succes', data: nuevoObjeto})
    }catch(error) {
        console.error('Error al crear objeto', error);
        return res.status(500).json({status: 'error', error, error})
    }
        

}

const updateObjeto = async (req = request, res = response) => {

    const {id, nombre, descripcion} = req.body

    console.log('Nombre', {nombre, descripcion})

    try {
        const existObjeto = await Objeto.findByPk(id)

        if (!existObjeto) {
            console.log('El objeto no existe')
            return res.status(400).json({status: 'fail', error: 'El objeto no existe'})
        }

        const modObjeto = await existObjeto.update({nombre, descripcion})

        return res.status(200).json({status:'succes', data: modObjeto})

    }catch(error) {
        console.error('Error al modificar el objeto', error);
        return res.status(500).json({status: 'error', error, error})
    }


}

const deleteObjeto = async (req = request, res = response) => {

    const {objetoId} = req.params

    try {
        const existObjeto = await Objeto.findByPk(objetoId)

        if (!existObjeto) {
            console.log('El objeto no existe')
            return res.status(400).json({status: 'fail', error: 'El objeto no existe'})
        }

        const modObjeto = await existObjeto.destroy()

        return res.status(200).json({status:'succes', data: modObjeto})

    }catch(error) {
        console.error('Error al eliminar el objeto', error);
        return res.status(500).json({status: 'error', error, error})
    }

}

module.exports = {getObjetos, getOneObjeto, postObjeto, updateObjeto, deleteObjeto}