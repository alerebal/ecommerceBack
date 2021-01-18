const router = require('express').Router();

const {
    create
} = require('../controllers/noUser.controller')

router.post('/noUser', create)

module.exports = router;