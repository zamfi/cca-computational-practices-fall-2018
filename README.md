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

#### Exploring Code -- a workshop about variables, conditions, and animations

Let's explore some more complicated animations. I've included four sketches below for inspiration.

#### Water dripping

```javascript
var x = 230;
var y = 220;

function setup() {
  createCanvas(400, 400);
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

Possible extensions:
1. Add silhouettes of trees or buildings above the ground
2. Add flickering lights within those silhouettes.
3. Add a second or third simultaneous shooting star.

[Homework for Week 3](hw/week3.md)

### Week 4: Friday, September 28, 2018

#### Homework Review

What did you learn from Shiffman's videos?
1. What's the point of an object?
2. What's an example of a range you might use for the `map` function?
3. What line of code would give me a random year in the last century?

#### Loops & Arrays

Here's a cheat sheet for arrays:

- `var listName = [];` -- create a new array
- `listName[3]` -- access item at index 3 (the *fourth* item) in the array
- `listName[3] = 7` -- set the item at index 3 to the number 7.
- `listName.push(12)` -- add the number 12 to the end of the array
- `listName.length` -- get the number of elements in the array

Here's a cheat sheet for loops:

```javascript
for (var i = 0; i < 10; i = i + 1) {
  print(i);
}
```

- `var i = 0;` -- **initializer**, runs before the loop starts
- `i < 10` -- **condition**, runs each time through the loop to check if loop should run again
- `i = i + 1` -- **increment**, runs after the loop body to change the loop variable
- `print(i)` -- **body**, the actual code in the loop that is run repeatedly


Now, with those in mind, let's convert this code from last week to use arrays and loops:

```javascript
function setup() {
  createCanvas(400, 400);
}

var x = 10;
var y = 10;
var changeInX = 3;
var changeInY = 3;

function draw() {
  background(220);
  
  ellipse(x, y, 40);
  
  x = x + changeInX;
  y = y + changeInY;
  
  if (x > width) {
    changeInX = -3;
  }
  
  if (x < 0) {
    changeInX = 3;
  }

  if (y > height) {
    changeInY = -3;
  }
  
  if (y < 0) {
    changeInY = 3;
  }
}
```

[Here's what we ended up with!](http://pastebin.com/vy2Bh94b)

[Homework for Week 4](hw/week4.md)

### Week 5: Friday, October 5, 2018

Designing and implementing from scratch, using the data/render/simulate/user input breakdown, a sketch of moderate complexity.

In class, we started building Snake together. We began by decomposing the game into components, and listing each component under the heading of Data Model, Rendering, Simulation, and User Input:

|     Data Model     | Rendering (Draw)    |     Simulation     |      User Input       |
|--------------------|---------------------|--------------------|-----------------------|
| food: `x`, `y` | food | move food when eaten |                  |
| snake: length, speed, location  | snake | snake growth, movement, collisions |  snake direction: arrow keys |
| grid | grid    |  make sure food and snake stay on grid  |                       |
| score  | score  |    |    |
| walls | | | 

Then we started writing code, picking off the easiest / lowest hanging fruit from our chart above. Good practice is to prioritize the smallest possible thing that you can still show works: in our case, we started by modeling and rendering the snake. Then, simulating the snake's movement. Etc.

We ended up with this code:

```javascript
var bodyX = [3, 3, 3, 3];
var bodyY = [2, 3, 4, 5];
var snakeLength = 4;
 
var direction = "right";
 
function setup() {
  createCanvas(400, 400);
    frameRate(1);
}
 
var GRIDSIZE = 15;
 
function draw() {
  background(220);
  noStroke();
 
  for (var i = 0; i < bodyX.length; i = i + 1) {
    rect(bodyX[i] * GRIDSIZE, bodyY[i] * GRIDSIZE, GRIDSIZE, GRIDSIZE);
  }
 
  if (direction == "right") {
    var oldX = bodyX[0];
    var oldY = bodyY[0];
    var newX = oldX + 1;
    var newY = oldY;
    bodyX.unshift(newX);
    bodyY.unshift(newY);
    print(bodyX, bodyY);
  }
 
  bodyX = bodyX.slice(0, snakeLength);
  bodyY = bodyY.slice(0, snakeLength);
}
```

We'll extend this a little bit in the homework!

[Homework for Week 5](hw/week5.md)


### Week 6: Friday, October 12, 2018

Today we'll start the "music and motion" mini-project. The goal here is to create an animation that is both beautiful (subjective) and  musical (also subjective). You'll work on this for homework for the next two weeks.

We'll start by breaking out of the p5.js web editor -- it's very useful in many ways, but also holds us back in many ways.

All the p5.js code we've been writing has actually been running in a web page generated and "served" by the p5.js editor using a piece of software called a "web server". In order to break out of the p5.js editor, we'll need to run our own "web server". Fortunately, this is not as scary as it sounds! (Aside: strictly speaking this is not true for all projects: if your project is simple enough -- e.g., doesn't include any sounds -- you can probably just open the `index.html` file directly from your browser.)

In fact, there are many ways to run a web server on your laptop. One of the least complicated is to use a web server that is built in to the Python programming language:

1.  Download your full project code.
    
    From the p5.js web editor, you can do this by going to the "File" menu -> "Download" -- then unzip this file to reveal a folder with all your code in it, including a file called `index.html`. 
    
    From GitHub, click the green "Clone or Download" button and the "Download ZIP" link inside that.

1. Install an older version, version 2.7.15, of python: visit [python.org](https://www.python.org) and follow the download links to download version 2.7.15.

1. Run the installer you just downloaded.

1.  Open up a command prompt on your computer. 
    
    On a Mac, this is the "Terminal" application in the "Utilities" folder of your "Applications" folder.
    
    On Windows, type `cmd` into the Start search bar, and run the "Command Prompt".

1.  The command prompt is a way to run "Command Line Interface" programs on your computer. Usually, when you open a command prompt, you'll be sitting in your home folder. Type `ls` (Mac) or `dir` (Windows) to see a list of the files in that folder, or type `cd ` followed by a folder name to switch into a new folder.
    
    Navigate your command prompt to the folder where your code files are. The easy way to do this is to type `cd ` (don't skip the space!) and then drag your folder into the terminal window. Hit enter. Type `ls` (Mac) or `dir` (Windows) to see a list of the files in that folder; you should see at least an `index.html` file and a `sketch.js` file, among others. The file `index.html` is the one that's sent to your browser by default.

1. Run python's built-in "simple" web server by typing `py -m SimpleHTTPServer 8000` (Windows) or `python -m SimpleHTTPServer 8000` (Mac) and pressing return (or enter).

1. Visit the page served by this web server by visiting [`http://localhost:8000`](http://localhost:8000) in Chrome on your computer.


#### Music and Motion

For the next two weeks, you'll work on making a sketch with music and motion.

To help get you started, here are a few example sketches. (Use Chrome for these, especially the ones that make sound!)

- [Keyboard Keyboard](https://editor.p5js.org/jd/sketches/H1SPkxA5X)
- [Fonty](https://editor.p5js.org/jd/sketches/ByMQ1e09X)
- [Musical Bounces](https://editor.p5js.org/jd/sketches/Hki9-JCcm)
- [Lines from Circles](https://editor.p5js.org/jd/sketches/SJhrvlR97)


### Week 7: Friday, October 19, 2018

First, you should all attend the Code in Color event next Thursday evening at CCA in Oakland! [Register here.](https://www.eventbrite.com/e/code-in-color-california-college-of-the-arts-tickets-50653496973)

#### Back to basics.

Consider the following code for loading a single sound:

```javascript
var mySound;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('doorbell.mp3');
}

function setup() {
  createCanvas(400, 400);
  mySound.setVolume(0.5);
  mySound.play();
}

function draw() {
  background(220);
}
```

You'll need the `doorbell.mp3` sound, so duplicate [this sketch](https://editor.p5js.org/jd/sketches/Skh1r5PiX) to get the full experience.

Can you figure out:

1. How to play the sound whenever you click?
2. How to make the doorbell ring frequently but randomly?
3. How to change the doorbell pitch? (Hint: look at the SoundFile.rate function in the reference!)

Now let's layer on another sketch:

```javascript
var x;
var y;
var vx = 3;
var vy = 2;
var r = 5;

function setup() {
  createCanvas(400, 400);
  x = random(r, width-r);
  y = random(r, height-r);
}

function draw() {
  ellipse(x, y, 10);
  
  x += vx;
  y += vy;
  
  if (x < r || x > width-r) {
    vx = -vx;
  } 
  if (y < r || y > height-r) {
    vy = -vy;
  }
}
```

Now you have a sketch that plays doorbell sounds, and a sketch that bounces a circle.

1. How can you combine these into a sketch that plays doorbell sounds when the circle bounces?

Here's the code we came up with together in class:

```javascript
var mySound;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('doorbell.mp3');
}

var x;
var y;
var vx = 3;
var vy = 2;
var r = 5;

function setup() {
  createCanvas(400, 400);
  x = random(r, width - r);
  y = random(r, height - r);
}

function draw() {
  background(220);
  ellipse(x, y, 10);

  x += vx;
  y += vy;

  if (x < r || x > width - r) {
    vx = -vx;
    mySound.play();
  }
  if (y < r || y > height - r) {
    vy = -vy;
    mySound.play();
  }
}
```

### Week 8: Friday, October 26, 2018

Questions about Music & Motion?

#### APIs

Here's a simple sketch that draws the current wind speed. You'll need to create an account with [Aeris Weather](https://www.aerisweather.com/signup/pricing/) to get API credentials. Then place those in the relevant part of the code below.

```javascript
var weather;

function preload() {
  var zipCode = "94618";
  var ID = "<YOUR ID HERE>";
  var SECRET = "<YOUR SECRET HERE>";
  weather = loadJSON(
    'https://api.aerisapi.com/observations/' + zipCode +
    '?client_id=' + ID + '&client_secret=' + SECRET);
}

var windSpeed;

function setup() {
  createCanvas(400, 200);

  windSpeed = weather.response.ob.windMPH;
  print("speed:", windSpeed);
}

function draw() {
  background(220);
  
  for (var y = 20; y < height-10; y += 20) {
    line(20, y, 20+random(4) + windSpeed * 10, y+random(-2, 2));
  }
}
```

#### Your own server

Last week, we looked at using python to run a web server.

Today, you'll run your own web server. 

A p5.js sketch typically looks like this:

1.  An `index.html` file. This file is the "entry point" to your sketch for the browser, and ties all the other parts together. Typically, this file looks like this:
    
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <script src="p5.min.js"></script>
      <script src="p5.dom.min.js"></script>
      <script src="p5.sound.min.js"></script>
      <link rel="stylesheet" type="text/css" href="style.css">
      <meta charset="utf-8">

    </head>
    <body>
      <script src="sketch.js"></script>  
    </body>
    </html>
    ```
    
    This file instructs the browser to load in four scripts and one stylesheet. The first 3 scripts are in the `head` section, and get loaded right away. The last script is `sketch.js`, which is where you actually write your p5.js sketch code.
1.  The `p5.min.js`, `p5.dom.min.js`, and `p5.sound.min.js` files -- these are JavaScript but "minified" to be as small as possible (and as a result, become non-human-readable). Variables are renamed to single letters, spaces and newlines are dropped, etc.
1.  The `style.css` stylesheet. This is CSS to instruct the browser to minimize any extra stuff around your sketch, but you can put other styling in here.
1.  The `sketch.js` file. This is your actual p5.js code, and what we've been actually editing in the p5.js web editor.

To run your own server, we'll first get comfortable with the command line, accessing files and folders:
    
1. Download and install [GitHub Desktop](http://desktop.github.com). This lets you interact with GitHub through a desktop app.
1. Make your own **fork** of the `simple-server` repository by visiting [simple-server](http://github.com/zamfi/simple-server), and clicking the **Fork** button.
1. Use GitHub Desktop to download the `simple-server` repository to your computer.
1. Open that project using Atom or Sublime Text.
1. Open the Terminal or Command Prompt and navigate to the server folder. (We'll do this together.) When you first open the terminal, you'll probably be in the "home" directory. Here are a few useful commands:
   1. `pwd` (or `echo %cd%` on windows) -- what folder are you currently in?
   1. `ls` (or `dir` on windows) -- list the files in the current folder
   1. `cd` -- change to a new folder, e.g., `cd my-sketch` or `cd public`
   1. `cat` (or `type` on windows) -- show the contents of a file, e.g., `cat index.html`

Now, to actually run the server:

1. Download and install [Node.js](http://nodejs.org). This is a program that runs javascript from your terminal, not your web browser. It lets you run servers and do other computation.
1. Navigate to the `simple-server` folder.
1. Enter and run the command `npm install` to install the libraries the server needs.
1. Enter and run the command `node server.js` to run the server itself.
1. Visit [http://localhost:8001/](http://localhost:8001) in your browser.

### Week 9: Friday, November 2, 2018

Today, we'll start with a critique for Music & Motion mini-project. BUt first, upload your project to CCA's web hosting, fluxus.

Upload your code to fluxus by [following the directions here](https://technology.cca.edu/help/web-hosting-ftp). I recommend [CyberDuck](https://cyberduck.io) to do your file transfering. (We'll do this together in class.)

#### HTML & CSS

So far, we've just used JavaScript with p5.js, and haven't really touched the other foundational pieces of web programming: HTML & CSS.

We'll be working together through the [HTML CSS & Javascript mini-workshop](html-css-miniworkshop.md).

#### JavaScript with HTML

You can do a lot with plain HTML & CSS, but you can't do everything. JavaScript plays a key role in modern web development too.



