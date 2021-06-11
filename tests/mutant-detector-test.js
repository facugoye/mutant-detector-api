var assert = require('assert')
var mutantDetector = require('../app/providers/mutant-detector')

describe('mutant-detector-provider', () => 
  describe('horizontalEqLength()', () => {
    it('Cuenta correctamente la cantidad de caracteres iguales desde la posicion dada', () => {
      mutantDetector.dna(["ABBTGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"])
      assert.equal(mutantDetector.horizontalEqLength(0,0), 1)
      assert.equal(mutantDetector.horizontalEqLength(0,1), 2)
      assert.equal(mutantDetector.horizontalEqLength(1,0), 1)
      assert.equal(mutantDetector.horizontalEqLength(3,2), 2)
      assert.equal(mutantDetector.horizontalEqLength(3,4), 2)
      assert.equal(mutantDetector.horizontalEqLength(4,0), 4)
      assert.equal(mutantDetector.horizontalEqLength(4,2), 2)
    })
  })
);