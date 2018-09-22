var x = 230;
var y = [];
var y[0] = 220;
var y[1] = 280;
var y[2] = 320;

function setup() {
  createCanvas(400, 400);
}
  
function draw() {
  background(0);
  noStroke();

  // draw pipe
  rect(0, 200, x, 20);
  
  // draw drip
  ellipse(x, y[0], 10);
  ellipse(x, y[1], 10);
  ellipse(x, y[2], 10);
  
  // down 3 pixels each frame
  y[0] = y[0] + 3;
  y[1] = y[1] + 3;
  y[2] = y[2] + 3;
  
  // if invisible for a full “height” amount, reset
  if (y[0] > height*2) {
    y[0] = 220;
  }

  if (y[1] > height*2) {
    y[1] = 220;
  }

  if (y[2] > height*2) {
    y[2] = 220;
  }
}