var assert = require('assert')
var db = require('../app/providers/database-provider')

describe("database-provider", () => {

    // describe('saveDna()', () => {
    //     it('inserta una columna correctamente', () => {
    //         db.saveDna(['ATGA'], false)

    //     })
    // })

    describe('getStats()', () => {
        it('Devuelve los valores de stats de la BD', async () => {
            await db.getStats().then(stats => {
                console.log(stats)
                assert.notEqual(stats, undefined)
            })

        })
    })
})