# Harrison.AI Imagery API [![Build Status](https://travis-ci.org/silver-xu/harrison-imagery-api.svg?branch=master)](https://travis-ci.org/silver-xu/harrison-imagery-api) [![codecov](https://codecov.io/gh/silver-xu/harrison-imagery-api/branch/master/graph/badge.svg)](https://codecov.io/gh/silver-xu/harrison-imagery-api)

> Harrison.AI Imagery API provides the interface to manage clinical images, disease labels and image labelling to other components in the Harrison.AI ecosystem.

## Pre-requisites

- Docker

  You will have to install the latest version of docker on your system in order to start the local database server. For detailed instructions to install docker on your system please check [this page](https://docs.docker.com/engine/install/).

- Node.js

  The project is designed to run on `Node.js v12.14.1`. Install `NVM` to take advantage of the `.nvmrc` feature for future updates.

- Yarn

  The project uses yarn to manage dependencies. For detailed instructions to install docker on your system please check [this page](https://classic.yarnpkg.com/en/docs/install/)

## Install all dependencies

```
yarn install
```

## Start local Mysql Database Server

Before starting the imagery api in local environment you will have to start the `MySql 5.7` database instance. Run the following snippet to build and run the `MySql 5.7` instance in docker. The schemas and sample data are automatically generated.

```
yarn start:db
```

## Build

```
yarn build
```

## Start

Build typescript into javascript and run the Harrison.AI Imagery API using `standard Node.js runtime`.

```
yarn start
```

## Start in watch mode

Run the Harrison.AI Imagery API under watch mode using `ts-node` and `nodemon`. Please note under this mode `Swagger Docs` will not be automatically updated. Use `yarn build` or `yarn start` to transpile the project into javascript to update `Swagger Docs`.

```
yarn start:watch
```

## Test

```
yarn test
```

## Linting

```
yarn lint
```

## Fix Linting

```
yarn format
```

## API Docs

API Docs are provided through swagger UI:

```
http://localhost:8080/api-docs/
```

or through swagger specification file:

```
http://localhost:8080/api-docs.json
```

## Technical Design

You may find the technical design document [here](./Design.md).
