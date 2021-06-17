var express = require('express')
var app = express()       

var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())            

var router = require('./routes')
app.use('/api', router)

router.use('/mutant', require('./routes/mutant'))


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