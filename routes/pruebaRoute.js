const { Router } = require('express');




const { pruebaGet,
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controller/pruebaController');




const router = Router();




router.get('/', pruebaGet);


//router.post('/', usuariosPost);


//router.put('/:id', usuariosPut);


//router.delete('/:id', usuariosDelete);


//router.patch('/', usuariosPatch);




module.exports = router;
