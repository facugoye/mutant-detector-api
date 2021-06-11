var assert = require('assert')
var mutantDetector = require('../app/providers/mutant-detector')

describe('mutant-detector-provider', () => 
  describe('isMutant()', () => {
    it('Debe retornar true para una secuencia horizontal', () => {
      assert.equal(mutantDetector.isMutant(["ABBTGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]), true)
    })
  })
);