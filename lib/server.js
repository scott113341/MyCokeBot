import bodyParser from 'body-parser';
import express from 'express';

import * as CokeBot from './CokeBot';
import * as util from './util';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', (req, res) => {
  var code = util.parseCode(req.body.Body);
  var text = `
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Sms>Thanks! Checking code ${code}</Sms>
    </Response>
  `;

  res.set('Content-Type', 'text/xml');
  res.send(text.trim());

  CokeBot.run(code, req.body);
});


const server = app.listen(3000, () => {
  console.log('server up');
});
