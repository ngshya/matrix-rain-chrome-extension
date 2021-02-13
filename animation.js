function updateQueryString(query){
  document.getElementById('query-string').innerHTML = query;
  document.getElementById('query-container').setAttribute("style", "display: block; height: " + window.innerHeight + "px;");
}

function hideQueryString(){
  query = "";
  document.getElementById('query-string').innerHTML = "";
  document.getElementById('query-container').setAttribute("style", "display: none;");
}

function matrixRain() {
  // Initialising the canvas
  var canvas = document.querySelector('canvas')
      ctx = canvas.getContext('2d');
  // Setting the width and height of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Setting up the letters
  var letters = Math.random().toString(36).substring(2, 27) + Math.random().toString(36).substring    (2, 27);
  letters = letters.split('');
  // Setting up the columns
  var fontSize = 10,
      columns = canvas.width / fontSize;
  // Setting up the drops
  var drops = [];
  for (var i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * 17);
  }
  var speed = [];
  for (var i = 0; i < columns; i++) {
    speed[i] = Math.random() * 3;
  }
  // Setting up the draw function
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < drops.length; i++) {
      var text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = '#0f0';
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      drops[i] = drops[i] + speed[i];
      if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
        drops[i] = 0;
        speed[i] = Math.floor(Math.random() * 3);
      }
    }
  }
  // Loop the animation
  setInterval(draw, 50);
}

function activateRain(){
  document.getElementById('matrix-rain').setAttribute("style", "display: block;");
}

function deactivateRain(){
  document.getElementById('matrix-rain').setAttribute("style", "display: none;");
}

async function resetScreen() {
  await new Promise(r => setTimeout(r, 5000));
  timer = timer - 5000;
  if (timer <= 1){
    hideQueryString();
    activateRain();
  }
}

function typing(event){
  timer = timer + 5000;
  resetScreen()
  if (event.key === "Backspace"){
    query = query.slice(0, -1);
    updateQueryString(query);
  } else if (event.key === "Enter"){
    if (query != ""){
      window.location = "http://www.google.com/search?q=" + encodeURI(query);
    }
  } else {
    query = query + event.key;
    deactivateRain();
    updateQueryString(query);
  }
}

var query = ""
var timer = 0;

window.addEventListener('load', matrixRain);
window.addEventListener('resize', matrixRain);
document.addEventListener("keydown", function(event){typing(event);});