const port = process.env.PORT || 5000;
const express = require('express');
const app = express();

app.post('/' + process.env.BOT_TOKEN, (req, res) => {
  res.sendStatus(200);
  res.write('Hola');
});

app.listen(port);
