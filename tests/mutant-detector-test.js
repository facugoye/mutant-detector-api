var assert = require('assert')
var mutantDetector = require('../app/providers/mutant-detector')
var dnaMutante = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]

describe('mutant-detector-provider', () => {

  describe('validate()', () => {
    it('La matriz dna debe ser cuadrada (NxN)', () => {
      var dna = mutantDetector.dna(["ACTGGGT", "ATCGG"])
      assert.equal(dna.validate().length === 0, false)

      var dna2 = mutantDetector.dna(["ACTGT", "AGGTA", "ATGAG", "TCGAC", "TGACG"])
      assert.equal(dna2.validate().length === 0, true)
    })

    it('Solo los caracteres ACTG son permitidos', () => {
      var dna = mutantDetector.dna(["ACTGT", "AXGTA", "ATGAG", "TCGAC", "TGACG"])
      assert.equal(dna.validate().length === 0, false)

      var dna2 = mutantDetector.dna(["ACTGT", "AGGTA", "ATGAG", "TCGAC", "TGACG"])
      assert.equal(dna2.validate().length === 0, true)
    })
  })

  describe('isMutant()', () => {
    it('Retorna false si no encuentra mas de una secuencia de caracteres iguales de longitud mayor o igual a maxLength', () => {
      var dna = mutantDetector.dna([
        "ATGCGA",
        "CAGTGC",
        "TTATTT",
        "AGACGG",
        "GCGTCA",
        "TCACTG"])
      assert.equal(!!dna.isMutant(), false)
    })

    it('Retorna true si encuentra mas de una secuencia de caracteres iguales de longitud mayor o igual a maxLength', () => {
      var dna = mutantDetector.dna([
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"])

      assert.equal(!!dna.isMutant(), true)
    })
  })

  describe('enoughItemsAtRight()', () => {
    it('Devuelve true si a la derecha hay suficientes elementos para armar una secuencia', () => {

      var dna = mutantDetector.dna(dnaMutante)

      assert.equal(dna.enoughItemsAtRight(0), true)
      assert.equal(dna.enoughItemsAtRight(1), true)
      assert.equal(dna.enoughItemsAtRight(2), true)
      assert.equal(dna.enoughItemsAtRight(3), false)
      assert.equal(dna.enoughItemsAtRight(4), false)
      assert.equal(dna.enoughItemsAtRight(5), false)
    })
  })

  describe('enoughItemsAtBottom()', () => {
    it('Devuelve true si abajo hay suficientes elementos para armar una secuencia', () => {

      var dna = mutantDetector.dna(dnaMutante)

      assert.equal(dna.enoughItemsAtBottom(0), true)
      assert.equal(dna.enoughItemsAtBottom(1), true)
      assert.equal(dna.enoughItemsAtBottom(2), true)
      assert.equal(dna.enoughItemsAtBottom(3), false)
      assert.equal(dna.enoughItemsAtBottom(4), false)
      assert.equal(dna.enoughItemsAtBottom(5), false)
    })
  })

  describe('enoughItemsAtDiagonalRight()', () => {
    it('Devuelve true si hay suficientes elementos para armar una secuencia en la diagonal hacia la derecha', () => {

      var dna = mutantDetector.dna(dnaMutante)

      assert.equal(dna.enoughItemsAtDiagonalR(0, 0), true)
      assert.equal(dna.enoughItemsAtDiagonalR(0, 2), true)
      assert.equal(dna.enoughItemsAtDiagonalR(0, 3), false)
      assert.equal(dna.enoughItemsAtDiagonalR(2, 0), true)
      assert.equal(dna.enoughItemsAtDiagonalR(3, 2), false)
      assert.equal(dna.enoughItemsAtDiagonalR(3, 4), false)
    })
  })

  describe('enoughItemsAtDiagonalLeft()', () => {
    it('Devuelve true si hay suficientes elementos para armar una secuencia en la diagonal hacia la izquierda', () => {

      var dna = mutantDetector.dna(dnaMutante)

      assert.equal(dna.enoughItemsAtDiagonalL(0, 0), false)
      assert.equal(dna.enoughItemsAtDiagonalL(0, 2), false)
      assert.equal(dna.enoughItemsAtDiagonalL(0, 3), true)
      assert.equal(dna.enoughItemsAtDiagonalL(2, 2), false)
      assert.equal(dna.enoughItemsAtDiagonalL(2, 3), true)
      assert.equal(dna.enoughItemsAtDiagonalL(3, 0), false)
      assert.equal(dna.enoughItemsAtDiagonalL(5, 0), false)
    })
  })

  describe('horizontalEqLength()', () => {
    it('Cuenta correctamente la cantidad de caracteres iguales desde la posicion dada', () => {

      var dna = mutantDetector.dna(dnaMutante)

      assert.equal(dna.horizontalEqLength(0, 0), 1)
      assert.equal(dna.horizontalEqLength(0, 1), 1)
      assert.equal(dna.horizontalEqLength(1, 0), 1)
      assert.equal(dna.horizontalEqLength(2, 0), 2)
      assert.equal(dna.horizontalEqLength(3, 2), 2)
      assert.equal(dna.horizontalEqLength(3, 4), 2)
      assert.equal(dna.horizontalEqLength(4, 0), 4)
      assert.equal(dna.horizontalEqLength(4, 2), 2)
    })
  })

  describe('verticalEqLength()', () => {
    it('Cuenta correctamente la cantidad de caracteres iguales desde la posicion dada', () => {

      var dna = mutantDetector.dna(dnaMutante)

      assert.equal(dna.verticalEqLength(0, 0), 1)
      assert.equal(dna.verticalEqLength(0, 2), 2)
      assert.equal(dna.verticalEqLength(1, 3), 2)
      assert.equal(dna.verticalEqLength(0, 4), 4)
      assert.equal(dna.verticalEqLength(4, 4), 2)
    })
  })

  describe('diagonalRightEqLength()', () => {
    it('Cuenta correctamente la cantidad de caracteres iguales desde la posicion dada', () => {

      var dna = mutantDetector.dna(dnaMutante)

      assert.equal(dna.diagonalREqLength(0, 0), 4)
      assert.equal(dna.diagonalREqLength(0, 2), 1)
      assert.equal(dna.diagonalREqLength(1, 3), 1)
      assert.equal(dna.diagonalREqLength(4, 2), 2)
      assert.equal(dna.diagonalREqLength(5, 4), 1)
    })
  })

  describe('diagonalLeftEqLength()', () => {
    it('Cuenta correctamente la cantidad de caracteres iguales desde la posicion dada', () => {

      var dna = mutantDetector.dna(dnaMutante)

      assert.equal(dna.diagonalLEqLength(0, 0), 1)
      assert.equal(dna.diagonalLEqLength(2, 4), 1)
      assert.equal(dna.diagonalLEqLength(4, 2), 2)
      assert.equal(dna.diagonalLEqLength(5, 4), 1)
      assert.equal(dna.diagonalLEqLength(5, 5), 1)
    })
  })

  describe('searchHorizontal()', () => {
    it('Devuelve true si hay mas de una secuencia horizontal de caracteres iguales de longitud >= a maxSequences', () => {

      var dna = mutantDetector.dna(
        ['CCAAAATCCCC',
          'CATTCTCGGAA',
          'CATTCTCGGAA',
          'CATTCTCGGAA',
          'CATTCTCGGAA',
          'CATTCTCGGAA',
          'CATTCTCGGAA',
          'CATTCTCGGAA',
          'CATTCTCGGAA',
          'CATTCTCGGAA',
          'CATTCTCGGAA']
      )

      assert.equal(dna.searchHorizontal(), true)
    })
  })

  describe('searchVertical()', () => {
    it('Devuelve true si hay mas de una secuencia vertical de caracteres iguales de longitud >= a maxSequences', () => {

      var dna = mutantDetector.dna(
        [
          'ATCGATCGATC',
          'TCAATCGATCA',
          'CGATCGATCAT',
          'GAACGATCATC',
          'ATAGATCATCG',
          'TCAATCATCGA',
          'CGATCATCGAT',
          'GATCATCGATC',
          'ATCATCGGTCG',
          'TCATCGAGCGA',
          'CATCGATGGAT']
      )

      assert.equal(dna.searchVertical(), true)
    })
  })

  describe('searchDiagonalR()', () => {
    it('Devuelve true si hay mas de una secuencia diagonal de caracteres iguales de longitud >= a maxSequences', () => {

      var dna = mutantDetector.dna(
        [
          'ATCGATCGATC',
          'TCAATCGATCA',
          'CGAACGAGCAT',
          'GAACGATCGTC',
          'AGAGATCATGG',
          'TCGATCATCAA',
          'CGAGCATCGAT',
          'GATGGTCGATC',
          'ATCATTGGTCG',
          'TCATCGAGCGA',
          'CATCGATAGGT']
      )

      assert.equal(dna.searchDiagonalR(), true)
    })

    it('Detecta correctamente dos secuencias en la misma diagonal', () => {

      var dna = mutantDetector.dna(
        [
          'ATCGATCGATC',
          'TCAATCGATCA',
          'CTAACGAGCAT',
          'GATCGATCCTC',
          'AGATATCATGG',
          'TCTATCATCAA',
          'CGAGCATCGAT',
          'GATGGTCGATC',
          'ATCATTGCTCG',
          'TCATCGAGCGA',
          'CATCGATAGCT']
      )

      assert.equal(dna.searchDiagonalR(), true)
    })
  })

  describe('searchDiagonalL()', () => {
    it('Devuelve true si hay mas de una secuencia diagonal de caracteres iguales de longitud >= a maxSequences', () => {

      var dna = mutantDetector.dna([
        'ATCGATCGATC',
        'TCAATCGATCA',
        'CGAACTAGCAT',
        'GAAAGGTAGTC',
        'AGACATCATGG',
        'TCGATCAACAA',
        'CGAGCAACGAT',
        'GTTGGTCGATC',
        'ATCGTTGGTCG',
        'TCGTCTAGCGA',
        'CGTCGATAGGT'
      ])

      assert.equal(dna.searchDiagonalL(), true)
    })

    it('Detecta correctamente dos secuencias en la misma diagonal', () => {

      var dna = mutantDetector.dna([
        'ATCGATCGATC',
        'TCATTCGATCA',
        'CGAACTAGCAT',
        'GAAAGGTAATC',
        'AGACATCATGG',
        'TCGATCAACAA',
        'CGAGCGACGAT',
        'GTTGTTCGATC',
        'ATCTTTGGTCG',
        'TCTTCTAGCGA',
        'CTTCGATAGGT'
      ])

      assert.equal(dna.searchDiagonalL(), true)
    })
  })

})