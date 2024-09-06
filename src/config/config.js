require("dotenv").config();

const auth0Domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUDIENCE;
const issuer = `https://${auth0Domain}/`;

module.exports = { auth0Domain, audience, issuer };
