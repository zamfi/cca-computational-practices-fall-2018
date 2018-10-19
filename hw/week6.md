## Homework 6 (due Thursday night, October 18, 2018)

You will be submitting each homework assignment into a new GitHub repository each week. [Here are instructions on how to do so.](https://github.com/zamfi/github-guide/blob/master/README.md) Please [email me](mailto:zamfi@cca.edu) if you have any questions!

### APIs prep

After making progress on your Music & Motion mini-project, watch Daniel Shiffman's videos [10.1 - 10.5](https://www.youtube.com/watch?v=rJaXOFfwGVw&index=1&list=PLRqwX-V7Uu6a-SQiI4RtIwuOrLJGnel0r). We'll do a workshop in class to solidify these ideas, but this will be good background to draw upon.

You should be able to answer these questions:

1. What is an API?
2. What is "JSON"? Why do developers use this?
3. What does `data.birds[1].members[2]` do?
4. What is a "callback"?

### Music & Motion mini-project

This week's assignment: make progress on your mini-project. 

Your goal is to combine motion and music in one sketch. Draw upon the work with animations you’ve done so far this term for motion, and consider the provided sketches below for inspiration in music.

Here are annotated versions of two of the sketches we looked at in class:

#### Keyboard keyboard

This sketch loads a single audio file, `glockenspiel.m4a`, and changes the "rate" of playback to change its pitch. (`.m4a` files are very similar to `.mp3` files.) **In order for this code to work, you need to have the `glockenspiel.m4a` sound in your project. For this, you can duplicate or download my sketch: [Keyboard Keyboard](https://editor.p5js.org/jd/sketches/H1SPkxA5X).**

The sketch starts by creating a `sounds` array and filling it with copies of the `glockenspiel.m4a` sound file set to play back at different rates / pitches:

```javascript
var sounds = [];

function preload() {
  soundFormats('m4a');
  for (var i = 0; i < 15; i++) {
    let sound = loadSound('glockenspiel.m4a');
    sound.rate(0.5 * pow(2, i / 12)); // 12-semitone exponential scale
    
    sounds.push(sound);
  }
}
```

The javascript `preload` function is like a pre-`setup` setup. It runs before setup, and is generally used for your code to load "assets": external files that are neede for your sketch to run, like sounds, images, etc.

In this preload, the code adds `15` "`sound`" entries to the `sounds` array, each one at a different pitch. The `0.5 * pow(2, i / 12)` "rate" emulates the modern western 12-tone scale to allow a "normal" keyboard-style playback. (Learn more about [music scales on Wikipedia](https://en.wikipedia.org/wiki/Scale_(music)).) Once the `preload` is run, the `sounds` array will be full of 15 sound ready for use!

Next up come the `setup` and `draw` functions:

```javascript
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);
  noStroke();

  for (var i = 0; i < sounds.length; i++) {
    let sound = sounds[i];
    if (sound.isPlaying()) {
      fill(map(sound.currentTime(), 0, sound.duration(), 255, 220));
      rect(width / sounds.length * (i + 0.5), height / 2, 25, 70);
    }
  }
}
```

In this sketch, the `setup` function is basic: create the canvas and set up the `rectMode` so that rectangles are drawn from the center.

The `draw` function, meanwhile, loops over the `sounds` array using the typical `for`-loop array construct: `for (var i = 0; i < array.length; i++)` -- starting at `i`ndex 0, going up to the `array`'s `length`, and going up by one each time (`i++` is equivalent to `i = i + 1` but is more common, probably because it's shorter).

For each entry in the `sounds` array, the loop body creates a local variable (`sound`) for use in the body, sets the `fill` by mapping the current playback location of the sound (`sound.currentTime()` returns [how many seconds in to the sound the playback is](https://p5js.org/reference/#/p5.SoundFile/currentTime), in the range going from 0 to `duration()`, the total length of the sound) to a grayscale fill value between `255` (if the sound just started) and `220` (if the sound is done).

Then, it draws a rectangle in a location that depends on the `sound`'s index in the `sounds` array, with the x-coordinate given by `width / sounds.length * (i+0.5)`. This expression spaces each rectangle `width / sounds.length` apart -- it divides the full width of the canvas by the number of sounds -- and then multiplies that by `(i+0.5)` instead of just plain `i` in order to get the centering effect right.

Lastly, we need to capture key presses to actually play the sounds!

```javascript
function keyPressed() {
  if (key == 'a') {
    sounds[0].play();
  }
  if (key == 'w') {
    sounds[1].play();
  }
  if (key == 's') {
    sounds[2].play();
  }
  if (key == 'e') {
    sounds[3].play();
  }
  if (key == 'd') {
    sounds[4].play();
  }
  if (key == 'f') {
    sounds[5].play();
  }
  if (key == 't') {
    sounds[6].play();
  }
  if (key == 'g') {
    sounds[7].play();
  }
  if (key == 'y') {
    sounds[8].play();
  }
  if (key == 'h') {
    sounds[9].play();
  }
  if (key == 'u') {
    sounds[10].play();
  }
  if (key == 'j') {
    sounds[11].play();
  }
  if (key == 'k') {
    sounds[12].play();
  }
  if (key == 'o') {
    sounds[13].play();
  }
  if (key == 'l') {
    sounds[14].play();
  }
}
```

This big set of `if` statements plays the corresponding sound to each key -- relatively straightforward!

#### Fonty

This sketch uses arrays-of-arrays to define a 5x7 dot-matrix font (including only F and G for now). Large circles that represent each of these dots and are moved into place or hidden outside the canvas according to each letter's `0` and `1` values to change what is displayed on screen. You can duplicate my [Fonty](https://editor.p5js.org/jd/sketches/ByMQ1e09X) sketch for the full code.

First, the code defines which dots should be visible for each letter:

```javascript
// define the font! these are 5x7 dot-matrix characters, but...
var F = [
  [1,1,1,1,1],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,1,1,1,0],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,0,0,0,0]
]  

var G = [
  [0,1,1,1,0],
  [1,0,0,0,1],
  [1,0,0,0,0],
  [1,0,0,1,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [0,1,1,1,0]
];

```

Each letter here is a list of 7 lists, each containing 5 `0`-or-`1` values. The `1` means the dot in that location should be visible, and a `0` means otherwise.

Next, we create the circle objects that we'll use the draw the characters:

```javascript
// a circle for every possible dot in the matrix
var circles = [];

function setup() {
  createCanvas(285, 400);
  // for every row...
  for (var r = 0; r < 7; r++) {
    // for every column in that row...
    for (var c = 0; c < 5; c++) {
      // make a circle in a random place
      circles.push({
        x: random(-width, 2*width), // width/5 * (c + 0.5),
        y: random(-height, 2*height) // height/7 * (r + 0.5),
      });
    }
  }
}
```

This code creates a `circles` array and fills it by going over the full 5x7 grid and adding an object to the array that has `x` and `y` properties that are random. This is a bit weird: we're making enough circles to draw a full grid of them, but we're giving them random locations!

```javascript
function draw() {
  background(220);
  
  // draw every circle
  for (var i = 0; i < circles.length; i++) {
    let circle = circles[i];
    noStroke();
    ellipse(circle.x + random(2), circle.y+random(2), 50);
    if (circle.targetX) {
	    circle.x = 0.9 * circle.x + 0.1*circle.targetX;
    }
    if (circle.targetY) {
      circle.y = 0.9 * circle.y + 0.1*circle.targetY;
    }
  }
}
```

Next, the `draw` function. This code loops over the full `circles` array, drawing each circle and moving it towards the (`targetX`, `targetY`) location if there is one. It does this by averaging a little bit of the target with a lot of the current location each frame, moving the `x` and `y` slowly towards `targetX` and `targetY`: using 90% of the current location and 10% of the target. Eventually the variable gets to its target!

The extra `+ random(2)` gives each circle a bit of lively jitter too!

```javascript
function keyPressed() {
  var letter;
  if (key == 'f') {
    letter = F;
  }
  if (key == 'g') {
    letter = G;
  }
  
  // for every row...
  for (var r = 0; r < 7; r++) {
    // for every column in tht row...
    for (var c = 0; c < 5; c++) {
      // get the circle for this location
      let circle = circles[r*5+c];
      // here's where the circle should go...
      let x = width/5 * (c + 0.5);
      let y = height/7 * (r + 0.5);
      
      // but do we draw it?
      if (letter[r][c] > 0) {
        // yes! move the circle to the x and y
        circle.targetX = x;
        circle.targetY = y;
      } else {
        // no! change x so that it's offscreen
        if (x < width/2) {
          x = -50;
        } else {
          x = width+50;
        }
        circle.targetX = x;
        circle.targetY = y;
      }
    }
  }
}
```

Finally, this `keyPressed` function does a few things. First, it sets a letter based on what key was pressed. But then, it goes over the grid (array-of-arrays) representation of the chosen letter, finds the circle that corresponds to that grid location, and then set the target destination of that circle. If the circle is visible (i.e., there's a `1` in the letter's grid position for that circle), it is moved into the right place. If it's *not* visible, it's moved offscreen to the left or right of the canvas, depending on the original grid position. Let's go over this more carefully.

These initial loops set us up to iterate over the whole grid:

```javascript
  for (var r = 0; r < 7; r++) {
    // for every column in tht row...
    for (var c = 0; c < 5; c++) {
      // get the circle for this location
      let circle = circles[r*5+c];
```

Our "outer" loop, using the `r` variable, loops over the each row the font. Then, for each for, the "inner" loop, using the `c` variable, loops over each column in that row. That means that in the body of our two loops, `r` and `c` refer to the row and column of each position in the grid -- and we'll see every row and columns position by the time the loops are all done.

With `r` and `c` we can now get the corresponding circle using the index `r*5+c`; this says "multiply the row number by 5 and add the column number". It's tricky beacuse it mirrors the way we set up the circles array initially: we just kept adding objects to the `circles` array, ignoring the actual row and column. But this gave us a single big array with all the circles, one for each grid position The `r*5+c` code just undoes this: it picks out a circle for each grid position. (Note that when we added circles, we added a total of 5*7 = 35 circles; here, to retrieve them, `r` caps out at 6 and `c` at 4, yielding `34` as the highest index -- perfect for a list with 35 circles.)

To actually set the targets takes a little bit of finessing to get this right: the `x = width/5 * (c + 0.5)` and `y = height/7 * ( + 0.5)` are the result of some trial-and-error, but ultimately they convert row and column values (the `r` and `c` variables that we get from the two nested loops) into `x` and `y` coordinates. 

Whether you use a grid or not for your project, this concept of having `targetX` and `targetY` variables is powerful: you can create all sorts of animations with them by slowly moving `x` and `y` towards a `targetX` and `targetY` as you draw your object!
