function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}

const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");

let intervalId = null; 

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}

function StartClick() {
  startButton.disabled = true; 
  stopButton.disabled = false; 
  intervalId = setInterval(changeBackgroundColor, 1000); 
}


function StopClick() {
  startButton.disabled = false; 
  stopButton.disabled = true; 
  clearInterval(intervalId); 
  document.body.style.backgroundColor = ""; 
}


startButton.addEventListener("click", StartClick);
stopButton.addEventListener("click", StopClick);
