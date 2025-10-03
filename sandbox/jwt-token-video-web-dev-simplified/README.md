# JWT - Tokens - Web Dev Simplified Video

`npm init`
`npm i express jsonwebtoken dotenv`
create `server.js` NOT `server.json`
`npm i -D nodemon` OR `node --watch server.js`

## to get a hashed Access Token:
run `node` from different terminal than server
`require('crypto').randomBytes(64).toString('hex');`
copy the generated secret without the quotes to the ACCESS_TOKEN_SECRET in .env

## in requests.http
make sure to put triple hashtags to separate your routes

The GET request for the Authorization: Bearer should be on one line !

Authorization: Bearer your.access.token