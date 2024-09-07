# Sample service based on NodeJS framework [EXPRESSJS](https://expressjs.com/) and protected using Auth0 access token 

## Description

This is a Sample API protected by Auth0 access token.

## Prerequisites

A supported Node.js LTS release (v18 at the moment is recommended) e.g. v18.20.3

## GIT-Repo
https://github.com/vaskarsarma/SECUREAPI

## Clone the repo
```bash
$ git clone https://github.com/vaskarsarma/SECUREAPI.git
```

## Installation

### Install dependencies

```bash
npm install
```

### Configure your environment

Edit ```.env``` with your development env values. Note that this file is meant to be used as a configuration reference and for development purpose only. Once your service is deployed, these env vars need to be stored externally (Deployment Configs for example), and secrets need to be pulled from secrets storage/Vault.

To run this project, you will need to add the following environment variables to a .env file in the root directory of your project:

    PORT=The port used to host the API server e.g. 7070

    AUTH0_DOMAIN=your auth0 domain
    AUDIENCE=your api audience 

    M2M_CLIENT_ID=your client id of the M2M application
    M2M_CLIENT_SECRET=your client secret of the M2M application

Note : All these above configs are belongs to the Auth0 config. Configure correctly to generate the Access Token and to access the protected API

Also consider that ```http_proxy``` for proxy settings which might be required to connect to downstream services

Add ```NODE_TLS_REJECT_UNAUTHORIZED=0``` in the ```.env``` file incase unable to connect to external API using localhost due to Certificate error

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

## Unit Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Running the app using docker

```bash
Run this command to build the docker image of the application
$ docker build --no-cache -t secureapi-app .

Run this command to start the docker container in the background
$ docker run -d -p 7070:7070 --name secureapi-container secureapi-app

Run this command to Check Running Containers
$ docker ps
This will show all running containers, including secureapi-container

Run this command to stop
$ docker stop secureapi-container

Run this command to remove the running container
$ docker rm secureapi-container
```

## API Endpoints

## Public Endpoint
```/getAccessToken``` API will create the ```AUTH0 Access Token``` using the 
```auth0 domain```, ```audience``` , ```M2M client id``` and ```M2M client secret```

### Request
```bash
$ curl --location --request GET 'http://localhost:7070/getAccessToken'
```

### Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
  "scope": "read",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

## Protected Endpoint
```/v1``` is the protected API endpoint and it require the ```access_token``` to access this API.
If used a valid Access Token API will decode and display the Access Token as JSON Response.

### Request
```bash
$ curl --location --request GET 'http://localhost:7070/v1/' \
--header 'authorization: Bearer <access_token>'
```

### Response: 
```json
{
    "iss": "https://....auth0.com/",
    "sub": "....",
    ...
}
```

# API docs (Swagger)

- Swagger UI is available on [http://localhost:7070/api](http://localhost:7070/api)
- Swagger JSON is available on [http://localhost:7070/api.json](http://localhost:7070/api.json)
