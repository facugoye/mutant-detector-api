var Connection = require('tedious').Connection
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES
var hasher = require('./hash')

var config = {
    server: 'mutant-detector-db-server.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'mutant-detector-db-server-admin',
            password: 'XMALD820L504LJCL$'
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'mutant-detector-db-database'
    }
};

var execute = (onConnect) => {
    var connection = new Connection(config)
    connection.on('connect', (err) => {
        if (err)
            console.log(err)
        else {
            console.log("Connected")
            onConnect(connection)
        }
    });

    connection.connect()
}
var getStats = () => {
    return new Promise((resolve, reject) => {
        var stats = { 'count_mutant_dna': undefined, 'count_human_dna': undefined, 'ratio': undefined }

        execute(connection => {
            var select = new Request("SELECT Count(NullIf(IsMutant,0)) MutantsCount, Count(IsMutant) TotalCount FROM [IsMutantResults] ", (err, rowCount) => {
                if (err)
                    reject(err)
                else
                    resolve(stats)
            })

            select.on('row', columns => {
                columns.forEach((column) => {
                    if (column.metadata.colName === 'MutantsCount')
                        stats.count_mutant_dna = column.value
                    else if (column.metadata.colName === 'TotalCount')
                        stats.count_human_dna = column.value
                })
            })

            select.on('requestCompleted', rowCount => {
                stats.ratio = Math.round(((stats.count_mutant_dna / stats.count_human_dna) + Number.EPSILON) * 10) / 10
                connection.close()
                resolve(stats)
            })

            connection.execSql(select)
        })
    })
}

var saveDna = (dna, isMutant) => {

    execute(connection => {

        var select = new Request("SELECT [IsMutant] from [IsMutantResults] where [DnaHash] = @DnaHash", (err, rowCount) => {
            if (err)
                console.log(err)
        })
        select.addParameter('DnaHash', TYPES.VarChar, hasher.hash(dna))

        var update = new Request("UPDATE [IsMutantResults] SET [IsMutant] = @IsMutant WHERE [DnaHash] = @DnaHash", (err) => {
            if (err)
                console.log(err)
        })
        update.addParameter('DnaHash', TYPES.VarChar, hasher.hash(dna))
        update.addParameter('IsMutant', TYPES.Bit, isMutant)
        update.on("requestCompleted", function (rowCount, more) {
            connection.close()
        });

        var insert = new Request("INSERT [IsMutantResults] ([DnaHash],[IsMutant]) VALUES (@DnaHash, @IsMutant);", (err) => {
            if (err)
                console.log(err)
        })
        insert.addParameter('DnaHash', TYPES.VarChar, hasher.hash(dna))
        insert.addParameter('IsMutant', TYPES.Bit, isMutant)
        insert.on("requestCompleted", function (rowCount, more) {
            connection.close()
        });

        var dnaResultFound = { isMutant: undefined }

        select.on('row', columns => {
            columns.forEach((column) => {
                if (column.metadata.colName === 'IsMutant')
                    dnaResultFound.isMutant = column.value
            })
        })

        select.on('requestCompleted', rowCount => {
            if (dnaResultFound.isMutant == undefined)
                connection.execSql(insert)

            else if (isMutant !== dnaResultFound.isMutant)
                connection.execSql(update)

            else
                connection.close()

        })

        connection.execSql(select)
    })
}

module.exports = {
    saveDna: saveDna,
    getStats: getStats
}