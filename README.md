# Computational Practices I, Fall 2018

This course repository contains homework assignments, useful guides, and code for **Computational Practices 1** at CCA, Fall 2018.

### Week 1: Friday, September 7, 2018

Inspiration:
- [Interviews with Practitioners](http://www.youtube.com/watch?v=eBV14-3LT-g)
- [Casey Reas](https://www.youtube.com/watch?v=_8DMEHxOLQE)

Lecture ([slides here](intro.pdf)):
- Introductions
- Computer Systems
- Reading Code

Hands-on activities:
- Representing things that aren't numbers...with numbers!

[Homework for Week 1](hw/week1.md)

### Week 2: Friday, September 14, 2018

Homework Review
- What did you learn from Shiffman's videos?

Intro to p5.js
- [Here's the p5.js reference](http://p5js.org/reference).
- `function setup` and `function draw`
- (`x`,`y`) coordinates and the Cartesian plane

#### Workshop: Building Blocks of Code -- functions

You give the computer commands by first writing the name of the command, like `background`, followed by a comma-separated list, in parentheses, containing the parameters for the function: that is, how the function should be run. 

Think of the command **"Do some pushups!"** You might ask: **"how many pushups?"** -- that number is a parameter to the command. It tells you something about how to perform the command. Same is true in JavaScript / p5.

Here's some sample code I wrote the replicated Piet Mondrian's classic *Composition II*:

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);

  noStroke();

  fill(0, 120, 255);
  rect(0, 320, 80, 80);

  fill(220, 0, 0);
  rect(80, 0, 320, 320);

  fill(255, 235, 0);
  rect(370, 360, 30, 40);

  stroke(0);
  strokeWeight(10);
  strokeCap(SQUARE);
  line(80, 0, 80, 400);
  line(0, 320, 400, 320);
  line(370, 320, 370, 400);

  strokeWeight(20);
  line(0, 150, 80, 150);

  strokeWeight(15);
  line(370, 360, 400, 360);
}
```

Run it in your editor, or run it on the [p5.js web editor](http://editor.p5js.org). (Either way, make sure to save frequently!)

1. Look up all the functions you don't know in the [p5.js reference](http://p5js.org/reference). Use the example code for each function to guide your exploration into what those functions do.

2. Modify this code, or come up with new code, that generates other work in the style of Mondrian. Be as accurate as you like in [chanelling Mondrian's own process](https://www.theartstory.org/artist-mondrian-piet.htm)!

3. Add some randomness: use the `random` function (look it up in the reference!) to make your sketch different each time it runs...

#### Building Blocks of Code: variables

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);

  noStroke();

  let red = color(220, 0, 0);
  let blue = color(0, 120, 255);
  let yellow = color(255, 235, 0);

  let leftLineX = 80;
  let lowerLineY = 320;
  let rightLineX = 370;
  let upperShortLineY = 150;
  let lowerShortLineY = 360;

  fill(blue);
  rect(0, lowerLineY, leftLineX, height - lowerLineY);

  fill(red);
  rect(leftLineX, 0, width - leftLineX, lowerLineY);

  fill(yellow);
  rect(rightLineX, lowerShortLineY, width - rightLineX, height - lowerShortLineY);

  stroke(0);
  strokeWeight(10);
  strokeCap(SQUARE);
  line(leftLineX, 0, leftLineX, height);
  line(0, lowerLineY, width, lowerLineY);
  line(rightLineX, lowerLineY, rightLineX, height);

  strokeWeight(20);
  line(0, upperShortLineY, leftLineX, upperShortLineY);

  strokeWeight(15);
  line(rightLineX, lowerShortLineY, width, lowerShortLineY);
}
```

Here's a different version of the code that produces the exact same canvas. What's different about it? **Names!**

Our previous code was a sea of numbers. If you wanted to move a point or line intersection around on that drawing, you had to find all the places in the code that referred to that point -- not an easy task! -- and change them in concert.

This **variable** approach here **names** some of the key locations on the canvas and lets us change them everywhere they're used in a drawing command by changing the number itself in **only one place**. p5.js already gives you some variables to work with, including `width` and `height`, used above to refer to the width and height of the canvas.

Naming is a very useful tool in our **abstraction** toolkit.

1. Try changing the canvas size in the code above and observe what happens. Why does this happen? (What happened when you changed the canvas size in the original, non-variable code?

2. Explore some of the other variables the p5.js provides. `mouseX` and `mouseY` are a fun interactive pairing!

#### Animations

One use of variables, explored above, is to name information and use that name to link other components together.

Another use of variables is to track information about an animation as it progresses.

For example, to move a circle across the screen, we might consider code like this:

```javascript
function setup() {
  createCanvas(400, 400);
}

var x = 10;

function draw() {
  background(220);
  
  ellipse(x, 200, 40);
  
  x = x + 3;
}
```

In an animation, your computer draws frames at a fixed rate (called, appropriately, the *frame rate*). In p5.js, you are responsible for telling p5 what to draw each frame: you put that drawing code inside the `draw` function. Each frame, p5.js runs your `draw` function and copies whatever it draws to the screen.

To make a smooth animation, we want each frame to look *mostly* like the previous frame, but with a small difference. The code above does that: each frame, the circle is draw 3 pixels further to the right. The code tracks the position of the circle with the `x` variable, whose value persists across frames -- so each frame, `x` is increased by 3.

The code above does what we want, but it's very one-shot: after the circle reaches the right edge of the canvas, it's over.

We can use an `if` statement -- a condition-checking piece of code -- to help us reset the circle's position if it reaches the right edge of the screen, like in the following code:

```javascript
function setup() {
  createCanvas(400, 400);
}

var x = 10;

function draw() {
  background(220);
  
  ellipse(x, 200, 40);
  
  x = x + 3;
  
  if (x > width) {
    x = 10;
  }
}
```

The `if` condition is checked every frame, and when (if?) `x` ever reaches the value of `width` -- 400 in this case, because that's the canvas width -- then `x` is reset to 10.

But that's just a reset. What if we want the circle to move backwards across the screen?

That's a second thing we need to track: the motion of the circle itself. We can make a new variable that tracks how many pixels per frame the circle moves, and then change that variable whenever the circle reaches a canvas boundary. 

```javascript
function setup() {
  createCanvas(400, 400);
}

var x = 10;
var changeInX = 3;

function draw() {
  background(220);
  
  ellipse(x, 200, 40);
  
  x = x + changeInX;
  
  if (x > width) {
    changeInX = -3;
  }
  
  if (x < 0) {
    changeInX = 3;
  }
}
```

[Homework for Week 2](hw/week2.md)

### Week 3: Friday, September 21, 2018

#### Homework Review

What did you learn from Shiffman's videos?
- What are variables?
- What is an animation?
- What is a condition? What kinds of conditions can you have?
- Variable names & variable intents.

#### Exploring Code

Let's explore some more complicated animations. I've included four sketches below for inspiration.

#### Water dripping

```javascript
var x = 230;
var y = 220;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB)
}
  
function draw() {
  background(0);
  noStroke();

  // draw pipe
  rect(0, 200, x, 20);
  
  // draw drip
  ellipse(x, y, 10);
  
  // down 3 pixels each frame, but maybe should be accelerating?
  y = y + 3
  
  // if invisible for a full “height” amount…
  if (y > height*2) {
    // reset
    y = 220;
  }
}
```

Possible extensions:
1. Add more drops!
2. Make the pipe leaky: add drops from other points on the pipe.
3. Add drops from the top of the canvas too.
4. Add a puddle that "grows" as it receives drops.

#### Filling a grid of circles

```javascript
function setup() {
  createCanvas(400, 400);
}

// track the circle to draw next frame
let x = 25;
let y = 25;

function draw() {
  colorMode(HSB);
  stroke(255);
  
  // draw circle with random hue
  fill(random(255), 100, 100);
  ellipse(x, y, 20);
  
  // set up next circle
  x = x + 25;
  
  // if we hit the right edge, go down a line
  if (x > width-25) {
    x = 25;
    y = y + 25;
  }
  
  // if we hit the bottom edge, reset to top
  if (y > height-25) {
    y = 25;
  }
}
```

Possible extensions:
1. Make each circle shift in hue just slightly from the previous one, instead of randomly.
2. Instead of drawing the circles sequentially, draw them randomly -- but maintain the grid pattern!

#### Smokestack

```javascript
var x = 210;
var y = 290;
var r = 0;

function setup() {
  createCanvas(400, 400);
}
  
function draw() {
  background(0);
  noStroke();

  // draw smokestack
  fill(255);
  rect(195, height, 30, -100);

  // darker as it gets closer to 0
  push();
  fill(y);
  translate(x, y);
  rotate(r);
  rect(-10, -10, 20, 20);
  pop();
  
  // up 3 pixels
  y -= 3;
  
  // rotate 0.05 radians ~= 2.8 degrees per frame
  r += 0.05
  
  // if reach past the top a bunch
  if (y < -150) {
    y = 290;
  }
}
```

Possible extensions:

1. Add additional independent "smoke" particles.
2. Give some of those particles movement in the `y` direction too.
2. Add more smokestacks.

#### Shooting stars

```javascript
function setup() {
  createCanvas(400, 400);
  background(0, 20, 80);
}

var fromX;
var fromY;
var toX;
var toY;
var step = 2.5;

function draw() {
  // draw background that fades stars slowly
  background(0, 20, 80, 1);
  
  // draw stars
  if (random() > 0.9) {
    stroke(255);
    point(random(width), random(height));
  }
  
  // create shooting stars
  if (random() > 0.95 && step >= 2.5) {
    fromX = random(width);
    fromY = random(height/2);
    toX = random(fromX+10, width);
    toY = random(fromY+10, height/2);
    step = 0;
  }
  
  // draw shooting stars
  if (step < 2.5) {
    // fade background
    let nextStep = step + 0.02;
    strokeWeight(3);
    stroke(0, 20, 80, 30);
    line(fromX, fromY, toX, toY);
    strokeWeight(1);
    // draw star
    if (step < 1) {
      stroke(255, (1-step) * 200);
      line(lerp(fromX, toX, step),     lerp(fromY, toY, step),
           lerp(fromX, toX, nextStep), lerp(fromY, toY, nextStep));
    }
    step = nextStep;
  }
    
  // draw ground
  noStroke();
  fill(0, 10, 20);
  rect(0, height*0.6, width, height);
  
  // draw lake
  noStroke();
  fill(0, 20, 60);
  ellipse(0, height, width*2.5, height*0.75);
}
```