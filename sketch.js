var bg;
var bgImage;
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkeyStoped;

function preload(){
  
  bgImage = loadImage("bg1.jpg")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  monkeyStoped = loadAnimation("sprite_1.png")
}



function setup() {
  createCanvas(650,400)
  bg = createSprite(300,200,650,400)
  bg.addImage(bgImage)
  
  monkey = createSprite(60,345,25,50)
  monkey.addAnimation("running",monkey_running)
   monkey.addAnimation("stoped",monkeyStoped)
  monkey.scale = 0.15;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  ground = createSprite(300,390,1400,20);
  ground.shapeColor = "brown"
  

}


function draw() {
  
  monkey.collide(ground)
  
  if(gameState===PLAY){
     bg.velocityX = -1.5;
  ground.velocityX = -3;
  
   if(ground.x<0){ 
     
  ground.x = ground.width/2;
  }
  
  if(bg.x<135){ 
    
  bg.x = 350;
  }  
  
  if(keyDown("space")&&monkey.y>320){
  monkey.velocityY = -17;
  }

  monkey.velocityY = monkey.velocityY  +1;
    
   if(monkey.isTouching(FoodGroup)){
        FoodGroup.destroyEach();
     score = score + 1;
   }
  
  spawnObstacles();
  spawnFruits();
    
    
    
    if(obstacleGroup.isTouching(monkey)){
     gameState=END;
      

    
    }
  }
  else if(gameState===END){
    ground.velocityX = 0;
    FoodGroup.setVelocityXEach(0);  
    obstacleGroup.setVelocityXEach(0);
    bg.velocityX = 0;
    FoodGroup.setLifetimeEach(-2)
    obstacleGroup.setLifetimeEach(-2)
    monkey.changeAnimation("stoped",monkeyStoped)
  }
 
  drawSprites();
  textSize(20)
  fill("black")
  text("score="+score,50,50)
}

function spawnObstacles(){
  if(frameCount%140===0){
    obstacle = createSprite(600,355,20,30);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2
    obstacle.lifetime=210
    obstacleGroup.add(obstacle)
  
  } 
}
function spawnFruits(){
  if(frameCount%85===0){
    banana = createSprite(600,random(150,300)); 
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.scale = 0.14
    banana.lifetime=210
    
    FoodGroup.add(banana);
  
  }
  
}



