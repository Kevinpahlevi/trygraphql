const getPort = require("get-port");
const express = require("express");
const expRouter = express.Router()
const app = require('../../server')
module.exports = { createServer };

async function createServer() {
  try {
    const port = await getPort();
    const instance = app.listen(port);
    return { instance, port };
  } catch (error) {
    throw error;
  }
}
