var balloon,balloonImage1,balloonImage2;
var database;

// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  database =firebase.database();

var balloonPosition = database.ref("ballon/height");
balloonPosition.on("value",readPosition);

  
}

function readPosition(data){
var position = data.val();

balloon.x =position.x;
balloon.y =position.y;

}


// function to display UI
function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
  
  
    drawSprites();

}

function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
 database.ref("ballon/height").set({
  x:balloon.x,
  y:balloon.y
 });
}
 
 
