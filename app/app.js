var express = require('express')
var app = express()       

var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())   

var serviceLocator = require('./modules/service-locator')()

serviceLocator.register('mutantDetector', require('./modules/mutantDetector'))

serviceLocator.register('hash', require('./modules/hash'))

serviceLocator.register('connParameters', {
  server:'mutant-detector-db-server.database.windows.net',
  database:'mutant-detector-db-database',
  userName:'mutant-detector-db-server-admin',
  password: 'XMALD820L504LJCL$'
})
serviceLocator.factory('databaseProvider', require('./modules/databaseProvider'))

var router = require('./routes')
app.use('/api', router)

serviceLocator.factory('mutant', require('./routes/mutant'))
router.use('/mutant', serviceLocator.get('mutant'))


const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

//arrancamos el servidor
var port = process.env.PORT || 8080
app.listen(port)
console.log('API escuchando en el puerto ' + port)

module.exports = app