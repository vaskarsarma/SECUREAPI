# Sample service based on NodeJS framework [EXPRESSJS](https://expressjs.com/) and protected using Auth0 access token 

## Description

This is a Sample draft API protected by Auth0 access token.

## Prerequisites

A supported Node.js LTS release (v18 at the moment is recommended)

## Installation

### Install dependencies

```bash
npm config set registry "http://repository.emirates.group/repository/npm-all/"
npm install
```

### Configure your environment

Edit ```.env``` with your development env values. Note that this file is meant to be used as a configuration reference and for development purpose only. Once your service is deployed, these env vars need to be stored externally (Deployment Configs for example), and secrets need to be pulled from secrets storage/Vault.

To run this project, you will need to add the following environment variables to a .env file in the root directory of your project:

    PORT=7070
    AUTH0_DOMAIN=your-auth0-domain
    AUDIENCE=your-api-audience 
    ISSUER=your-issuer

Note : All these above configs are belongs to the Auth0 config. Protected API call will fail if not configured properly

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

- Swagger UI is available on [http://localhost:8080/api](http://localhost:8080/api)
- Swagger JSON is available on [http://localhost:8080/api-json](http://localhost:8080/api-json) (Please make sure to export that file and reference it in ```pipeline_config.groovy``` for a successful Swagger Validation step during continues integration).
