var assert = require('assert')

describe('hash', () => {

    describe('hash()', () => {
      it('Debe retornar igual hash para el mismo objeto', () => {
        var hash1 = require('../app/providers/hash')
        var h1 = hash1.hash(["ACTGGGT", "ATCGG"])

        var hash2 = require('../app/providers/hash')
        var h2 = hash2.hash(["ACTGGGT", "ATCGG"])

        assert.equal(h1, h2)
      })

      it('Debe retornar distint hash para el distintos objetos', () => {
        var hash1 = require('../app/providers/hash')
        var h1 = hash1.hash(["ACTGGGT", "ATCGT"])

        var hash2 = require('../app/providers/hash')
        var h2 = hash2.hash(["ACTGGGT", "ATCGG"])

        assert.notEqual(h1, h2)
      })
    })
})