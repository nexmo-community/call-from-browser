# Make a Phone Call from a Web Browser with Nexmo In-App Voice and Vue.JS

An application that allows you to make phone calls from your web browser using Nexmo In-App Voice and Vue.JS.

You can read how the [Make a Phone Call from a Web Browser with Nexmo In-App Voice and Vue.JS]( https://www.nexmo.com/blog/2018/08/20/phone-call-web-b…-voice-vue-js-dr/) app was built on the Nexmo blog.

## Prequisites

* [A Nexmo account](https://dashboard.nexmo.com/sign-up)
* Something like [Ngrok](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr) for local tunneling

## Setup

Replace `example.com` with a URL to a publicly accessible URL that tunnels through to your local server.

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

Setup a local tunnel to the Node server:

```sh
ngrok http 3000
```

Update the Nexmo Application with the Ngrok (or other) URL e.g.:

```sh
nexmo app:update NEXMO_APP_ID "call-from-browser" https://SUBDOMAIN.ngrok.io/answer https://SUBDOMAIN.ngrok.io/event
```

Navigate to the Vue.JS application at `http://localhost:8080`, enter a valid phone number and click the button to make a call.

## Deploying to Heroku

### Using CLI

Ensure you have run through the *Setup* steps above. You'll additionally need the [Heroku CLI](https://devcenter.heroku.com/categories/command-line) installed.

Clone the repo:

```sh
git clone git@github.com:nexmo-community/call-from-browser.git
cd call-from-browser
```

Create a Heroku application replacing `HEROKU_APP_NAME` with the name you'd like to give the app:

```sh
heroku apps:create HEROKU_APP_NAME
```

And take a note of the Heroku URL your web app has e.g. https://HEROKU_APP_NAME.herokuapp.com/ Then update your Nexmo application with the Heroku URL:

```sh
nexmo app:update NEXMO_APP_ID "call-from-browser" https://HEROKU_APP_NAME.herokuapp.com/answer https://HEROKU_APP_NAME.herokuapp.com/event
```

Set the Heroku environment variables up to match your local environment variables in `.env` but provide the full string of the `private.key` contents for the `NEXMO_PRIVATE_KEY` value:

```sh
heroku config:set NEXMO_PRIVATE_KEY="$(cat server/private.key)"
heroku config:set NEXMO_APP_ID=YOUR_APP_ID # see .env or .nexmo-app for value
heroku config:set NEXMO_APP_USER_NAME=demo
heroku config:set NEXMO_FROM_NUMBER=YOUR_NEXMO_NUMBER # set if you have a Nexmo Virtual Number
```

Push the code to Heroku:

```sh
git push heroku master
```

### Using the Deploy to Heroku button

WIP: See https://github.com/nexmo-community/call-from-browser/tree/deploy-to-heroku-button

## Additional Development Notes

### Compiles and minifies for production

```sh
yarn run build
```

### Lints and fixes files

```sh
yarn run lint
```
