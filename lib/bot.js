import Nightmare from 'nightmare';
import twilio from 'twilio';


const twilioClient = twilio(accountSid, authToken);
const WAIT = 1200;


export async function run(code, twilioBody) {
  var message = await enterCode(code);
  return await sendMessage(message, twilioBody);
}


export async function enterCode(code) {
  console.log('running with code', code);

  var nightmare;

  try {
    nightmare = Nightmare({show: true, debug: true});

    await nightmare
      .goto('https://www.mycokerewards.com/account/authenticate')
      .type('#capture_signIn_traditionalSignIn_emailAddress', 'scott.the.hardy@gmail.com')
      .wait(WAIT)
      .type('#capture_signIn_traditionalSignIn_password', 'irtnog')
      .wait(WAIT)
      .click('#capture_signIn_traditionalSignIn_signInButton')
      .wait(WAIT)
      .click('#h-statusBar')
      .wait(WAIT);

    var points = await nightmare.evaluate(getPoints);
    console.log(points);

    await nightmare
      .type('[name="enterCodeField"]', code)
      .wait(WAIT)
      .click('.enterCodeSubmit')
      .wait(WAIT)
      .wait(WAIT)
      .wait(WAIT)
      .click('.enterCodeBrands img')
      .wait(WAIT)
      .wait(WAIT);

    var pointsNow = await nightmare.evaluate(getPoints);
    console.log(pointsNow);

    if (pointsNow > points) return `Thank you! Code ${code} added ${pointsNow - points} points for a total of ${pointsNow}`;
    else throw new Error('points didn\'t increase');
  }

  catch (e) {
    console.log('had an error!');
    console.log(e);
    return `Oh no! There was a garbage error when entering code ${code}.`;
  }

  finally {
    await nightmare.end();
    console.log('the nightmare is over');
  }
}


export async function sendMessage(message, twilioBody) {
  try {

  }

  catch (e) {

  }
}


function getPoints() {
  return document.querySelector('#h-profilePointAmount').innerText.split('\n')[0];
}
