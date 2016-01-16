import Nightmare from 'nightmare';
import twilio from 'twilio';


const env = process.env;
const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
const WAIT = 1200;


export async function run(code, twilioBody) {
  try {
    var message = await enterCode(code);
    return await sendMessage(message, twilioBody);
  }
  catch (e) {
    console.log(e);
  }
}


export async function enterCode(code) {
  var nightmare;

  try {
    nightmare = Nightmare({ show: true });

    await nightmare
      .goto('https://www.mycokerewards.com/account/authenticate')
      .type('#capture_signIn_traditionalSignIn_emailAddress', env.MCR_EMAIL)
      .wait(WAIT)
      .type('#capture_signIn_traditionalSignIn_password', env.MCR_PASSWORD)
      .wait(WAIT)
      .click('#capture_signIn_traditionalSignIn_signInButton')
      .wait(WAIT)
      .click('#h-statusBar')
      .wait(WAIT);

    var points = await nightmare.evaluate(getPoints);

    await nightmare
      .type('[name="enterCodeField"]', code)
      .wait(WAIT)
      .click('.enterCodeSubmit')
      .wait(WAIT * 2)
      .click('.enterCodeBrands img')
      .wait(WAIT * 2);

    await nightmare.goto('http://www.mycokerewards.com/content/home.html');

    var pointsNow = await nightmare.evaluate(getPoints);

    if (pointsNow > points) return `Thank you! Code ${code} added ${pointsNow - points} points for a total of ${pointsNow}.`;
    else throw new Error('points didn\'t increase');
  }

  catch (e) {
    console.log(e);
    return `Oh no! There was an error when entering code ${code}.`;
  }

  finally {
    await nightmare.end();
  }
}


export async function sendMessage(message, twilioMessage) {
  try {
    return twilioClient.messages.create({
      to: twilioMessage.From,
      from: twilioMessage.To,
      body: message
    });
  }

  catch (e) {
    console.log(e);
  }
}


function getPoints() {
  return parseInt(document.querySelector('#h-profilePointAmount').innerText.split('\n')[0]);
}
