var router = require('express').Router()

module.exports = function (databaseProvider, mutantDetector)  {
  
  var db = databaseProvider 

  router.post('/', (req, res) => {

    var dna = mutantDetector.dna(req.body.dna)
  
    var errors = dna.validate()
    if (errors.length)
      res.status(400).json({ message: errors })
  
    else if (dna.isMutant()) {
      res.status(200).json({ message: 'mutant detected' })
      db.saveDna(req.body.dna, true)
    }
  
    else {
      res.status(403).json({ message: 'NOT mutant' })
      db.saveDna(req.body.dna, false)
    }
  })
  
  router.get('/stats', async (req, res) => {
    var stats = undefined
    await db.getStats().then(s => stats = s)
    res.json(stats)
  })

  return router
}



