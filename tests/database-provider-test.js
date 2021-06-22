var assert = require('assert')

//TODO crear otra base de datos para UT
var connParameters = {
    server: 'mutant-detector-db-server.database.windows.net',
    database: 'mutant-detector-db-database',
    userName: 'mutant-detector-db-server-admin',
    password: 'XMALD820L504LJCL$'
}

var db = require('../app/modules/databaseProvider')(
    connParameters,
    require('../app/modules/hash')
    )

describe("database-provider", () => {

    describe('saveDna()', () => {
        it('inserta una fila correctamente', async () => {
           await  db.saveDna(['ATGA'], false)
            //TODO definir un assert aca.. Por ahora me conformo con que no tire una exception
        })
    })

    describe('getStats()', () => {
        it('Devuelve los valores de stats de la BD', async () => {
            await db.getStats().then(stats => {
                console.log(stats)
                assert.notEqual(stats, undefined)
            })

        })
    })
})