# node-redis-mongodb

__description__ : 
    
    A project to demonstrate node js, redis and mongo db integration.

__prequities__ :

    1. cache server - Redis cloud 
    2. db server - mongo db atlas cloud
    3. node server - not deployed yet
    4. no configuration file is created and credentials are hardcoded for now

__folder structure__ :

    1. constants contains the static data's.
    2. controller holds the business logic for every routes and handle the routes.
    3. model to define the entity.
    4. public folder to serve the static contents
    5. index.js - start point of application, app will get start once db and cache servers are connected.

__business flow__ :

    1. An API is created and used as external source of data.
    2. Data fetched from external source - updated in database, updated in cache, pdf file is created and served in response.
    3. PDF file created contains data in table form with the help of html. styling is not done for now.

__API's__ :

    1. http://localhost:3001/api/product?search={queryparam} - GET PRODUCT API
    2. http://localhost:3001/api/product/list - GET PRODUCT LIST API
    3. http://localhost:3001/api/external?search={queryparam} - EXTERNAL DATASOURCE API
