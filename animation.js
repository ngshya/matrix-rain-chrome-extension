window.addEventListener('load', matriRain)
window.addEventListener('resize', matriRain);

function matriRain() {
    // Initialising the canvas
    var canvas = document.querySelector('canvas'),
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
