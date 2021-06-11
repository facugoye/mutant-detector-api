var router = require('express').Router()
var mutantDetector = require('../providers/mutant-detector')

router.post('/', function(req, res) {

  var isMutant = mutantDetector.isMutant(req.body.dna)

  if(isMutant)
    res.status(200).json({ message: 'mutant detected' })
  else
    res.status(403).json({ message: 'NOT mutant' })

})

router.get('/stats', function(req, res) {
  res.json({ message: 'STATS'  })
})

module.exports = router