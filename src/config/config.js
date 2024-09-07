require("dotenv").config();

const auth0Domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUDIENCE;
const issuer = `https://${auth0Domain}/`;
const client_id = process.env.M2M_CLIENT_ID;
const client_secret = process.env.M2M_CLIENT_SECRET;
const api_timeout = process.env.AUTH_API_TIMEOUT_IN_MS;

module.exports = {
  auth0Domain,
  audience,
  issuer,
  client_id,
  client_secret,
  api_timeout,
};
