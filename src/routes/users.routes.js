const router = require('express').Router();

const {
    signUp,
    signIn,
    getUser
} = require('../controllers/user.controllers');

router.get('/user/:id', getUser)

router.post('/newUser', signUp)
router.post('/logIn', signIn)


module.exports = router;