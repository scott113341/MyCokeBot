import bodyParser from 'body-parser';
import express from 'express';

import * as bot from './bot.js';
import * as util from './util.js';


const ENV = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', (req, res) => {
  var code = util.parseCode(req.body.Body);
  var text = `
    <?xml version="1.0" encoding="UTF-8"?>
    <Response></Response>
  `;

  res.set('Content-Type', 'text/xml');
  res.send(text.trim());

  console.log('redeeming code', code);
  bot.run(code, req.body);
});


app.get('/code/:code', (req, res) => {
  const code = util.parseCode(req.params.code);
  res.send({ code });

  console.log('redeeming code', code);
  bot.run(code, req.body);
});


app.listen(ENV.PORT, () => {
  console.log('server up');
});
