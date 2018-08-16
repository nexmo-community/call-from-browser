require('dotenv').config({
    path: __dirname + '/.env'
});

const Nexmo = require('nexmo');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('dist'))

const userAcl = {
    "paths": {
        "/v1/users/**": {},
        "/v1/conversations/**": {},
        "/v1/sessions/**": {},
        "/v1/knocking/**": {}
      }
};

app.get('/no-auth', (req, res) => {
    const jwt = Nexmo.generateJwt(process.env.NEXMO_PRIVATE_KEY, {
        application_id: process.env.NEXMO_APP_ID,
        sub: "leggetter",
        exp: new Date().getTime() + 86400,
        acl: userAcl
    })

    res.json({userJwt: jwt})
})

app.get('/answer', (req, res) => {
    const ncco = [{
        "action": "connect",
        "from": "447520631555",
        "endpoint": [{
            "type": "phone",
            "number": req.query.to
        }]
    }]

    res.json(ncco)
})

app.post('/event', (req, res) => {
    console.log('===Event')
    console.log(req.body)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))