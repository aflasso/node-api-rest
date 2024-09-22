const { Router } = require('express');

const {validarJWT, authenticate} = require('../middlewares/validarJWT')

const { pruebaGet,
    userByIdGet,
    userByActive,
    userByDeactive,
    userPost,
    userUpdate,
    userDelete,
    logIn
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controller/pruebaController');




const router = Router();


router.delete("/delete/:userId", userDelete)

router.get('/', pruebaGet);

router.get('/active', userByActive)

router.get('/deactive', userByDeactive)

router.post('/new', userPost)

router.put('/update', userUpdate)

router.post('/login', logIn)

router.get('/:userId', userByIdGet)


//router.post('/', usuariosPost);


//router.put('/:id', usuariosPut);


//router.delete('/:id', usuariosDelete);


//router.patch('/', usuariosPatch);




module.exports = router;
