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

This **variable** approach here **names** some of the key locations on the canvas and lets us change them everywhere they're used in a drawing command by changing the number itself in **only one place**.

