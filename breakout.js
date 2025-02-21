var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
var BALL_RADIUS = 15;
var DELAY = 10;

var ball;
var paddle;
var dx = 3;
var dy = 3;
var stopped = true;
var fails = 0;
var brickCount = NUM_BRICKS_PER_ROW * NUM_ROWS;
var blank;
var text1;
var text2;

function start(){
    drawBricks();
    drawBall();
    drawPaddle();
    mouseMoveMethod(movePaddle);
    mouseClickMethod(click);
}
function drawBricks(){
    for(var i = 0; i < NUM_ROWS; i++){
        for(var j = 0; j < NUM_BRICKS_PER_ROW; j++){
            var x, y, color;
            x = BRICK_SPACING + j * (BRICK_WIDTH + BRICK_SPACING);
            y = BRICK_TOP_OFFSET + i * (BRICK_HEIGHT + BRICK_SPACING)
            if(i < 2){
                color = Color.red;
            } else if (i < 4) {
                color = Color.orange;
            } else if (i < 6) {
                color = Color.green;
            } else {
                color = Color.blue;
            }
            drawSingleBrick(color, x, y);
        }
    }
}
function drawSingleBrick(color, x, y) {
    var brick = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT);
    brick.setPosition(x, y);
    brick.setColor(color);
    add(brick);
}
function drawBall() {
    ball = new Circle(BALL_RADIUS);
    ball.setPosition(getWidth() / 2, getHeight() / 2);
    add(ball);  
}
function drawPaddle() {
    paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
    paddle.setPosition(getWidth() / 2 - (PADDLE_WIDTH / 2), getHeight() - PADDLE_OFFSET - PADDLE_HEIGHT);
    add(paddle);
}
function moveBall() {
    checkBounce();
    checkBricks();
    checkFails();
    checkWins();
    ball.move(dx, dy);
}
function movePaddle(e) {
    if (e.getX() >= getWidth() - (PADDLE_WIDTH / 2)) {
        paddle.setPosition(getWidth() - PADDLE_WIDTH, getHeight() - PADDLE_OFFSET - PADDLE_HEIGHT);
    }   else if (e.getX() <= PADDLE_WIDTH / 2) {
            paddle.setPosition(0, getHeight() - PADDLE_OFFSET - PADDLE_HEIGHT);
        }   else {
                paddle.setPosition(e.getX() - (PADDLE_WIDTH / 2), getHeight() - PADDLE_OFFSET - PADDLE_HEIGHT);
            }
            
}
function click(e) {
    if (fails == 3) {
            brickCount = NUM_BRICKS_PER_ROW * NUM_ROWS;
            remove(blank);
            remove(text1);
            remove(text2);
            drawBricks();
            fails = 0;
        }
    if(stopped) {
        setTimer(moveBall, DELAY);
        stopped = false;
    }   else {
            stopTimer(moveBall);
            stopped = true;
        }
}
function checkBounce() {
var myVariablePaddle = getElementAt(ball.getX(), ball.getY() + BALL_RADIUS);
    if (myVariablePaddle != null) {
        dy = -dy
    }
    if( ball.getX() + BALL_RADIUS > getWidth()) {
        dx = -dx
    }
    if( ball.getX() - BALL_RADIUS < 0) {
        dx = -dx
    }
    if( ball.getY() - BALL_RADIUS < 0) {
        dy = -dy
    }
}
function checkBricks() {
    var myVariableBrick = getElementAt(ball.getX(), ball.getY() - BALL_RADIUS);
    if (myVariableBrick != null) {
        remove(myVariableBrick);
        brickCount--;
        dy = -dy
    }
}
function checkFails() {
    if( ball.getY() + BALL_RADIUS > getHeight()) {
        ball.setPosition(getWidth() / 2, getHeight() / 2);
        stopTimer(moveBall);
        fails++;
        stopped = true;
        if (fails == 3) {
            endScreen("Game Over");
            stopped = false;
        }
    }
}
function checkWins() {
    if(brickCount == 0) {
        ball.setPosition(getWidth() / 2, getHeight() / 2);
        stopTimer(moveBall);
        fails = 3;
        endScreen("You Win");
        stopped = false;
    }
}
function endScreen(x) {
    blank = new Rectangle (getWidth(), getHeight());
    blank.setPosition(0, 0);
    blank.setColor(Color.white);
    add(blank);
    
    text1 = new Text (x);
    text1.setPosition(getWidth() / 2 - (text1.getWidth() / 2), getHeight() / 2 - (text1.getHeight() / 2));
    add(text1);
            
    text2 = new Text ("Click to Replay");
    text2.setPosition(getWidth() / 2 - (text2.getWidth() / 2), getHeight() / 2 + 25);
    add(text2);
}
