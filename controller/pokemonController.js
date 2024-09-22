const {request, response} = require("express")
const Pokemon = require("../models/pokemon")
const { User } = require("../models/persona")

const pokemonGet = (requ =  request, res = response) => {

    Pokemon.findAll({include: [{model: User, as: 'User', attributes: ['id', 'usuario', 'email']}]}).then(pokemons => {
        console.log('Pokemons enocntrados: ', pokemons)
        return res.json(pokemons)
    })
    .catch(error => {
        console.error('Error al obtener los pokemons: ', error)
    })

}

const pokemonGetOne = async (req = request, res = response) => {

    const pokemonId = req.params.pokemonId

    Pokemon.findByPk(pokemonId).then((pokemon) => {

        if (pokemon) {
            return res.status(200).json(pokemon)
        }else {
            return res.status(404).json({message: 'Pokemon no encontrado'})
        }

    }).catch(error => {
        console.error('Error al buscar pokemon')
        return res.status(500).json({message: error})
    })

}

const pokemonPost  = async (req = request, res = response) => {

    const {id, nombre, tipo, nivel, entrenador_id} = req.body

    try {
        const existingPokemon = await Pokemon.findByPk(id)

        if (existingPokemon) {
            console.error('El pokemon ya existe')
            return res.status(400).json({ok:false, message: "El pokemon ya existe"})
        }
    
    }catch(error){
        console.error('Error al crear pokemon: ', error)
        return res.status(500).json({ok: false, message: error})
    }


    try {

        const newPokemon = await Pokemon.create({
            nombre: nombre,
            tipo: tipo,
            nivel: nivel,
            entrenador_id: entrenador_id
        })

        console.log(newPokemon)
        return res.status(201).json(newPokemon)

    } catch (error) {
        console.error('Error al crear pokemon: ', error)
        return res.status(500).json({ok: false, message: error})
    }
}


const pokemonPut = async (req = request, res = response) => {

    const {id, nivel, nombre} =  req.body

    try {
        const existingPokemon = await Pokemon.findByPk(id)

        if (!existingPokemon) {

            console.error('El pokemon no existe')
            return res.status(400).json({ok:false, message: "El pokemon no existe"})

        }

        const newPokemon = await existingPokemon.update({nivel: nivel, nombre: nombre})

        console.log('Nuevo pokemon: ', newPokemon)
        return res.status(200).json({ok: true, message: newPokemon})

    } catch (error) {
        console.error('Error al modificar pokemon: ', error)
        return res.status(500).json({ok: false, message: error})
    }
}

const pokemonDelete = async (req = request, res = response) => {

    const {pokemonId} = req.params

    try {
        const existingPokemon = await Pokemon.findByPk(pokemonId)

        if (!existingPokemon) {

            console.error('El pokemon no existe')
            return res.status(400).json({ok:false, message: "El pokemon no existe"})

        }

        const newPokemon = await existingPokemon.destroy()

        console.log('Pokemon eliminado: ', newPokemon)
        return res.status(200).json({ok: true, message: newPokemon})


    } catch (error) {
        console.error('Error al eliminar pokemon: ', error)
        return res.status(500).json({ok: false, message: error})
    }

}

module.exports = {pokemonGet, pokemonGetOne,pokemonPost, pokemonPut, pokemonDelete}