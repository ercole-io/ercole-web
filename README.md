# ercole-web
 
This is the frontend for the Ercole project. Documentation available [here](https://ercole.io).

## Requirements

- nodejs 10 or greater
- npm

## Install dependencies

    npm install

## How to build (production)

    mvn run build

The resulting jar is a dependency of the ercole-server project.

## How to run (dev)

Adjust the proxy url in vue.config.js to point to your ercole-server, then run

    npm run serve
