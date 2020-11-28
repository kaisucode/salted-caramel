
export function getRandomMessage(mode) {
  return normalMessages();
  // return "message from utils";
}

function normalMessages(){
  const messages = [
    "Get back to work!!", 
    "Bruh"
  ];

  randomNum = Math.floor(Math.random() * messages.length);
  return messages[randomNum];
}

