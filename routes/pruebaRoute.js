const { Router } = require('express');




const { pruebaGet,
    userByIdGet,
<<<<<<< HEAD
    usersByActive,
    usersByDeactive
=======
    userByActive,
    userByDeactive,
    userPost,
    userDelete
>>>>>>> 75233089c697a3afe003aa6995bfef2cb90f4279
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controller/pruebaController');




const router = Router();




router.get('/', pruebaGet);

router.get('/active', userByActive)

router.get('/deactive', userByDeactive)

router.post("/new", userPost)

router.get('/:userId', userByIdGet)

router.delete("delete/:userId", userDelete)

//router.post('/', usuariosPost);


//router.put('/:id', usuariosPut);


//router.delete('/:id', usuariosDelete);


//router.patch('/', usuariosPatch);




module.exports = router;
