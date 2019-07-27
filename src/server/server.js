/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const ws = require("express-ws");
const pty = require("node-pty");

const app = express();
const wsServer = ws(app);


// Type of event that could be send from the client
const MESSAGE_TYPE_DATA = "data";

wsServer.app.ws("/ws", (ws, req) => {
  let term = pty.spawn("/bin/bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 24,
    cwd: process.env.PWD,
    env: process.env
  });

  ws.on("message", data => {
    let json = JSON.parse(data);
    let message = json.data;

    if (json.type === MESSAGE_TYPE_DATA) {
      term.write(message);
    }
  });

  ws.on("close", code => {
    if (term) {
      term.kill();
    }
  });
});
