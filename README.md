# mutant-detector-api
reconocimiento de mutantes por medio de su ADN

## API
https://mutant-detector.azurewebsites.net/api

## Documnetacion (Swagger)
https://mutant-detector.azurewebsites.net/api-docs

## Postman Collection
Para ejectutar las llamadas a la API se puede utilizar Postman https://www.postman.com/.

En la carpeta postman se encunentra un backup de la coleccion que  puede importarse directamente. 

Utilizar el environment llamado CodeDetector Azure

## Analisis del requerimiento.

Reconocer matrices con mas una secuencia de caracteres iguales con longitud >= 4. En cualquier dirección.

Crear una API HTTP que provea el servicio antes mencionado. 

## Eleccion de tecnologias

Background: VS, .Net, C#, SLQ, js, jQuery, IIS, TeamCity 

Tecnologias seleccionadas: Nodejs, SQL, Azure

## Tasks

* Ivnvestigar tecnologias
	+ [X] Nodejs 
	+ [X] Mocha 
	+ [X] Azure
	+ [ ] BD?

* [X] Codificar el detector
* [ ] UT
	+ [X] UT detector provider
	+ [ ] UT API
* [ ] Integration test
* [ ] stress test


## Despliegue

El despliegue se realiza automaticamente por cada commit en la rama main de este repositorio.

El despligue en azure corre automaticamente los test unitarios

https://portal.azure.com/#@f1d7bc82-d201-445e-bd03-ae20d7e242b7/resource/subscriptions/46f96639-9d30-4065-a32a-92ce3642f843/resourceGroups/MutantDetector/providers/Microsoft.Web/sites/mutant-detector/appServices

## Links

Creación de una API con node.js
https://juanda.gitbooks.io/webapps/content/api/creacion_de_una_api_con_nodejs.html/

Deploy Express.js to Azure App Service using Visual Studio Code
https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/deploy-nodejs-azure-app-service-with-visual-studio-code?tabs=bash

Mocha Test https://mochajs.org/#getting-started