var Nightmare = require('nightmare');

async function run() {
  var nightmare = Nightmare();
  console.log('started nightmare');


  await nightmare.goto('http://cnn.com');
  console.log('went to cnn');
  var title = await nightmare.evaluate(function() {
      return document.title;
    });
  console.log(title);
  await nightmare.end();
}

run();
