
export function getRandomMessage(mode) {
  return normalMessages();
}

function normalMessages(){
  const messages = [
    "HEY. HEY. hEY. HEYyYyYyY. GO DO WORK", 
    "Bruh",
    "Yeah because that’s how the geniuses of tomorrow are made. By scrolling on tiktok.", 
    "That problem set’s not gonna finish itself. This isn’t just a harsh comment; it’s a harsh reality.", 
    "You know your final is tomorrow right? I’d say you can do it but...it doesn’t look like you’ve studied enough.", 
    "Do you really want to live out your life looking like the Hunchback of Notre Dame? I thought not - sit up straight.", 
    "Stop it right now. Your screen time is literally 12 hours and it consists entirely of Tik tok and Instagram.", 
    "When was the last time you saw the sun? You look like an ugly Edward Cullen bruh, go outside for a bit.", 
    "You’re not gonna get Elon Musk rich by spending THIS much time scrolling on your phone :/"
  ];

  randomNum = Math.floor(Math.random() * messages.length);
  return messages[randomNum];
}

