## Homework 4 (due Thursday night, October 4, 2018)

You will be submitting each homework assignment into a new GitHub repository each week. [Here are instructions on how to do so.](https://github.com/zamfi/github-guide/blob/master/README.md) Please [email me](mailto:zamfi@cca.edu) if you have any questions!

### Classwork Wrap-up

In [class](../README.md#), we started writing a clone of the classic game Snake. Here's an expanded set of code that's missing a few pieces to be complete:

```javascript
var bodyX = [3, 3, 3, 3];
var bodyY = [2, 3, 4, 5];
var snakeLength = 4;

var GRIDSIZE = 15;

var foodX = 10;
var foodY = 10;

var direction = "right";

function setup() {
  createCanvas(405, 405);
  frameRate(5);
}

function draw() {
  background(0);

  // handle motion
  var oldX = bodyX[0];
  var oldY = bodyY[0];
  var newX = oldX;
  var newY = oldY;

  if (direction == "right") {
    newX = oldX + 1;
  }
  if (direction == "left") {
    // ???
  }
  if (direction == "down") {
    newY = oldY + 1;
  }
  if (direction == "up") {
    // ???
  }

  // add new head
  bodyX.unshift(newX);
  bodyY.unshift(newY);

  // make sure snake isn't too long
  bodyX = bodyX.slice(0, snakeLength);
  bodyY = bodyY.slice(0, snakeLength);
  
  // is head on the food?
  if (bodyX[0] == foodX && bodyY[0] == foodY) {
    snakeLength = snakeLength + 1;
    frameRate(frameRate() + 1);
    placeFood();
  }

  // draw snake
  noStroke();
  fill(255);
  for (var i = 0; i < bodyX.length; i = i + 1) {
    rect(bodyX[i] * GRIDSIZE, bodyY[i] * GRIDSIZE, GRIDSIZE, GRIDSIZE);
  }
  
  // draw food
  fill(255, 0, 0);
  rect(foodX * GRIDSIZE, foodY * GRIDSIZE, GRIDSIZE, GRIDSIZE);
  
  // check for collisions with snake
  for (var i = 1; i < bodyX.length; i = i + 1) {
    if (bodyX[i] == bodyX[0] && bodyY[i] == bodyY[0]) {
      background(0, 90);
      fill(255);
      textSize(96);
      text("GAME", width/2-textWidth("GAME")/2, height/2-25);
      text("OVER", width/2-textWidth("OVER")/2, height/2+75);
      noLoop();
    }
  }
  
  // check for collisions with edges
  // ???
}

function placeFood() {
  // pick new x and y coordinates
  foodX = floor(random(width/GRIDSIZE));
  foodY = floor(random(height/GRIDSIZE));
  
  for (var i = 0; i < bodyX.length; i = i + 1) {
    // is the food already on the snake?
    if (foodX == bodyX[i] && foodY == bodyY[i]) {
      // if so, try again
      return placeFood();
    }
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    direction = "down";
  }
  // ??? - other directions?
}
```

**Assignment**: Replace all the `???` comments above to create a (basic) functional version of Snake! You should be able to pattern-match your way into this. Save in your homework repo as `snake.js`. (Do as much as you can, and submit what you have even if you can't finish it!)

**Optional Challenge**: Add scoring to the game and show the score in the corner of the canvas.

### Practice with Loops

Here's one way of working with loops, and figuring out how to turn a pattern into code:

1. Write down the coordinates of the shapes you want to create in your loop.
2. Find the pattern for those coordinates
  a. Where does it start?
  b. Where does it end?
  c. How much does it change each time?
3. Use that pattern in a *for* loop: `for (var i = START; i < END; i = i + CHANGE) { ... }`
  
For example, to create the following sketch:

![triangle of lines](img/triangle.png)

...start by writing down some endpoints for those lines:

```
(20, 20) -> (20, 20)
(20, 30) -> (30, 20)
(20, 40) -> (40, 20)
(20, 50) -> (50, 20)
(20, 60) -> (60, 20)
(20, 70) -> (70, 20)
(20, 80) -> (80, 20)
.
.
.
(20, 480) -> (480, 20)
```

...from these coordinates, we can find a pattern for each of the four parameters we need to draw a line:

- `startX`: always 20
- `startY`: starts at 20, ends at 480, goes up by 10 each time
- `endX`: starts at 20, ends at 480, goes up by 10 each time
- `endY`: always 20

...from this pattern, we can generate a loop that draws these lines, by creating a variable that starts at `20`, ends at `480`, and goes up by `10` each time. We won't call the variable `x` or `y` beacuse we don't use it exclusively for either coordinate.

```javascript
for (var i = 20; i <= 480; i = i + 10) {
  var startX = 20;
  var startY = i;
  var endX = i;
  var endY = 20;
  line(startX, startY, endX, endY);
}
```

**Assignment**: Recreate the following images. Name them in your repository as labeled below.

You may find it help, before starting this exercise, to re-watch Daniel Shiffman's video tutorials about [`while` and `for` loops](https://www.youtube.com/watch?v=cnRD9o6odjk) and [nested loops](https://www.youtube.com/watch?v=1c1_TMdf8b8).

1.  `vertical-lines.js` -- first, some vertical lines:
    
    ![vertical lines](img/vertical-lines.png)
    
    To get you started, let's apply the instructions above to this image of vertical lines. First, we note the endpoints of the first few lines:
    
    ```
    (10, 10) -> (10, 390)
    (20, 10) -> (20, 390)
    (30, 10) -> (30, 390)
    .
    .
    .
    (390, 10) -> (390, 390)
    ```
    
    So, we have `x1` and `x2` as the only values that change; they **start** at `10`, go **up to** `390`, and go **up by** `10` each time. That means we can use the following loop:
    
    ```javascript
    function setup() {
      createCanvas(400, 400);
    }
    
    function draw() {
      background(220);
      for (var i = 10; i <= 390; i = i + 10) {
        line(i, 10, i, 390);
      }
    }
    ```        

2.  `horizontal-lines.js` -- next, make horizontal lines:

    ![horizontal lines](img/horizontal-lines.png)
    
3.  `concentric-circles.js` -- try these concentric circles too:
    
    ![concentric circles](img/concentric-circles.png)

4.  `cone-of-lines.js` -- and this cone:
    
    ![cone of lines](img/cone-of-lines.png)

5.  `diamond-lines.js` -- also this diamond:
    
    ![diamond](img/diamond.png)

6.  `taller-lines.js` -- what about these taller lines?
    
    ![doubles](img/doubles.png)

7.  **Optional Challenge**: `art-deco.js` -- for this you'll need a **loop within a loop**:
    
    ![artdeco](img/artdeco.png)

8.  **Optional Challenge**: `circle-grid.js` -- now try this grid of circles; you'll need **nested loops** for this one too!
    
    ![circle grid](img/circle-grid.png)

### Sol LeWitt

**Assignemnt**: Pick 3 of Sol LeWitt's *Wall Drawings* from [this retrospective at MASS MoCA](http://massmoca.org/sol-lewitt/) and reproduce them using code. Label these in your [homework repository](http://github.com/zamfi/github-guide) according to their title in the restrospective, e.g., `lewitt-368.js`. Feel free to use the image as your guide or LeWitt's instructions directly. More info about [Sol LeWitt's instructions here](http://risdmuseum.org/manual/45_variations_of_a_drawing_sol_lewitt_and_his_written_instructions).

Get creative! Use whatever code you're comfortable with. Bonus points for doing more than 3, or for animating them in some way.

You may also find interesting Casey Reas' [{Software} Structures](http://artport.whitney.org/commissions/softwarestructures/map.html). 