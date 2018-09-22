var x = 230;
var y0 = 220;
var y1 = 280;
var y2 = 320;

function setup() {
  createCanvas(400, 400);
}
  
function draw() {
  background(0);
  noStroke();

  // draw pipe
  rect(0, 200, x, 20);
  
  // draw drip
  ellipse(x, y0, 10);
  ellipse(x, y1, 10);
  ellipse(x, y2, 10);
  
  // down 3 pixels each frame
  y0 = y0 + 3;
  y1 = y1 + 3;
  y2 = y2 + 3;
  
  // if invisible for a full “height” amount, reset
  if (y0 > height*2) {
    y0 = 220;
  }

  if (y1 > height*2) {
    y1 = 220;
  }

  if (y2 > height*2) {
    y2 = 220;
  }
}