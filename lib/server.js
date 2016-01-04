import bodyParser from 'body-parser';
import express from 'express';

import * as bot from './bot';
import * as util from './util';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', (req, res) => {
  var code = util.parseCode(req.body.Body);
  var text = `
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Sms>Redeeming code ${code}...</Sms>
    </Response>
  `;

  res.set('Content-Type', 'text/xml');
  res.send(text.trim());

  bot.run(code, req.body);
});


app.listen(process.env.PORT, () => {
  console.log('server up');
});
