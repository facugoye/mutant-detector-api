var router = require('express').Router()

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Bienvenido a Mutant Detector' })
})

module.exports = router