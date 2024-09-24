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


router.delete("/delete/:userId", authenticate,userDelete)

router.get('/', authenticate ,pruebaGet);

router.get('/active', authenticate, userByActive)

router.get('/deactive', authenticate, userByDeactive)

router.post('/new', authenticate, userPost)

router.put('/update', authenticate, userUpdate)

router.post('/login', logIn)

router.get('/:userId' , authenticate, userByIdGet)


//router.post('/', usuariosPost);


//router.put('/:id', usuariosPut);


//router.delete('/:id', usuariosDelete);


//router.patch('/', usuariosPatch);




module.exports = router;
