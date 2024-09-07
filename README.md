# Sample service based on NodeJS framework [EXPRESSJS](https://expressjs.com/) and protected using Auth0 access token 

## Description

This is a Sample draft API protected by Auth0 access token.

## Prerequisites

A supported Node.js LTS release (v18 at the moment is recommended)

## GIT-Repo
https://github.com/vaskarsarma/SECUREAPI

## Installation

### Install dependencies

```bash
npm config set registry "http://repository.emirates.group/repository/npm-all/"
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

## API Endpoints
```bash
# Public Endpoint
$ curl http://localhost:7070/

# Response:
{
  "message": "Public Endpoint"
}

# Protected Endpoint
$ curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:7070/v1

# Response:

{
    "iss": "https://....auth0.com/",
    "sub": "....",
    ...
}
```


## API docs (Swagger)

- Swagger UI is available on [http://localhost:7070/api](http://localhost:7070/api)
- Swagger JSON is available on [http://localhost:7070/api.json](http://localhost:7070/api.json)
