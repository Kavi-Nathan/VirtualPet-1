//Create variables here
var database;
var dog,happyDog, database,foodStock;
var dogSitting, dogStanding;
var dog;
var foodVal, foodVal02;

function preload()
{
  //load images here
  dogStanding = loadImage('images/dogImg.png');
  dogSitting = loadImage('images/dogImg1.png');
}

function setup() {
  createCanvas(displayWidth-23, displayHeight-135);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock),
  
  dog = createSprite((displayWidth-13)/2, (displayHeight-125)/1.5, 50, 50);
  dog.addImage(dogSitting);
  dog.scale = 0.5;
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    feedFood();
  }

  if(foodVal === 0){
    foodZero();
  }
  
  foodCountUpdate();
  drawSprites();
  gameInstructions();
 
}

function readStock(foodData){
  foodVal = foodData.val();
  //console.log(foodVal);
}

function writeStock(foodVal02){
    foodVal02 = foodVal02-1;

  database.ref('/').update({
    Food:foodVal02
  });
}

function feedFood(){
  //console.log(foodVal);
  if(foodVal > 0) {
    writeStock(foodVal);
    //console.log(foodVal);
    dog.addImage(dogStanding);
  }
}

function foodZero(){
  //console.log(foodVal);
  textSize(60);
  fill("red");
  text("YOU RAN OUT OF FOOD!",(displayWidth-13)/3 , 250);
}

function foodCountUpdate(){
  textSize(35);
  fill("white");
  text("Food Remaining: "+ foodVal,(displayWidth-13)/2.3,400);
}

function gameInstructions(){
  textSize(35);
  fill ("black");
  text("Press the Up Arrow Key to feed your dog", (displayWidth-13)/2.8, 50);
}