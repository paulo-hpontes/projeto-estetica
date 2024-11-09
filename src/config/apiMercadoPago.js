require("dotenv").config();
const { MercadoPagoConfig } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken:process.env.PAYMENT_ACESS_TOKEN,
});

module.exports = client;
