# Make a Phone Call from a Web Browser with Nexmo In-App Voice and Vue.JS

An application that allows you to make phone calls from your web browser using Nexmo In-App Voice and Vue.JS.

## Prequisites

* [A Nexmo account](https://dashboard.nexmo.com/sign-up)

## Setup

In the first command replaces `example.com` with a URL to a publicly accessible URL that tunnels through to your local server. We recommend using [Ngrok](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr) to do this.

```sh
nexmo app:create call-from-browser https://example.com/answer https://example.com/event --keyfile=server/private.key
nexmo user:create name=demo
touch server/.env
```

Add configuration to `.env`:

```
NEXMO_PRIVATE_KEY=private.key
NEXMO_APP_ID=YOUR_APP_ID
NEXMO_FROM_NUMBER=A_NEXMO_NUMBER
NEXMO_APP_USER_NAME=demo
```

## Install Dependencies

```sh
yarn install
cd server
yarn install
cd ..
```

## Running the App Locally

Compile and hot-reload Vue.JS App in development:

```sh
yarn run serve
```

Run the application server:

```sh
node server/index.js
```

Navigate to the Vue.JS application at `http://localhost:8080`.

## Running the App on Heroku

TODO

## Additional Development Notes

### Compiles and minifies for production

```sh
yarn run build
```

### Lints and fixes files

```sh
yarn run lint
```
