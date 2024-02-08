const nodemailer = require("nodemailer");
require("dotenv").config();

// nodemailer config
//! not forget to change the refresh token when expired
const transporterBase = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: process.env.MY_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
    }
});

module.exports = transporterBase;