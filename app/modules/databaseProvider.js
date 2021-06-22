var Connection = require('tedious').Connection
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES

module.exports = function (connParameters, hash) {

    var ret = {
        saveDna,
        getStats
    }

    var config = {
        server: connParameters.server,
        authentication: {
            type: 'default',
            options: {
                userName: connParameters.userName,
                password: connParameters.password
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: connParameters.database
        }
    }

    var execute = (onConnect) => {
        var connection = new Connection(config)
        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
                throw err
            }
            else {
                console.log("Connected")
                onConnect(connection)
            }
        });

        connection.connect()
    }

    function getStats() {
        return new Promise((resolve, reject) => {
            var stats = { 'count_mutant_dna': undefined, 'count_human_dna': undefined, 'ratio': undefined }

            execute(connection => {
                try {
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
                }
                catch (ex) {
                    reject(err)
                }
            })
        })
    }

    function saveDna(dna, isMutant) {
        return new Promise((resolve, reject) => {
            execute(connection => {

                var select = new Request("SELECT [IsMutant] from [IsMutantResults] where [DnaHash] = @DnaHash", (err, rowCount) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                })
                select.addParameter('DnaHash', TYPES.VarChar, hash.hash(dna))

                var update = new Request("UPDATE [IsMutantResults] SET [IsMutant] = @IsMutant WHERE [DnaHash] = @DnaHash", (err) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                })
                update.addParameter('DnaHash', TYPES.VarChar, hash.hash(dna))
                update.addParameter('IsMutant', TYPES.Bit, isMutant)
                update.on("requestCompleted", function (rowCount, more) {
                    connection.close()
                    resolve()
                });

                var insert = new Request("INSERT [IsMutantResults] ([DnaHash],[IsMutant]) VALUES (@DnaHash, @IsMutant);", (err) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                })
                insert.addParameter('DnaHash', TYPES.VarChar, hash.hash(dna))
                insert.addParameter('IsMutant', TYPES.Bit, isMutant)
                insert.on("requestCompleted", function (rowCount, more) {
                    connection.close()
                    resolve()
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

                    else {
                        connection.close()
                        resolve()
                    }

                })

                connection.execSql(select)
            })
        })
    }

    return ret
}