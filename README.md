# Ory Hydra user managment application

The purpose of the project is to make small but working user management project by using ORY Hydra library as OAuth 2.0 authorization and OpenID Connect server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. First let's set up the hydra ory with our configurations.
2. Running the application.

### Prerequisites

What things you need to install

- Nodejs
- Docker
- Postgresql

### Installing

We will use the Docker Compose configuration in the ORY Hydra code base. Getting the Hydra source code is easy:

1. Copy the hydra repo:

```
git clone https://github.com/ory/hydra.git
```

2. cd to hydra folder and replace the quickstart.yml with our quickstart.yml.
3. for creating database and running hydra in docker, by running

```
docker-compose -f quickstart.yml -f quickstart-postgres.yml up --build
```

4. open new terminal in hydra folder and lets create a client for the application by running

```
docker-compose -f quickstart.yml exec hydra hydra clients create --endpoint http://127.0.0.1:4445 --id auth-code-client --grant-types authorization_code,refresh_token --response-types code,id_token --scope openid,offline --callbacks http://localhost:5555/callback --token-endpoint-auth-method none
```

Lets build the user managment with a thrid-party application:

1. cd to client directroy(third-party client):

```
npm install
```

```
npm run build:frontend
```

```
npm run build:backend
```

```
npm run start
```

2. cd to Nodejs directory(authorization server):

```
npm install
```

```
npm run build:frontend
```

```
npm run build:backend
```

```
npm run start
```

5.  cd to server directory (resource server):

```
npm install
```

```
npm run build:frontend
```

```
npm run build:backend
```

```
npm run start
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

## Authors

- **Godlike**

## License

This project is licensed under the MIT License
