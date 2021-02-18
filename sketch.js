var PLAY = 1, END = 0, gameState = PLAY, trex, ground ,  invisibleGround , ObstaclesGroup, CloudsGroup, count, gameOver,restart
 var cloudimg, gameoverimg, ground2img, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, restartimg, treximage,die,jummp,checkPoint
     
function preload(){
 treximage = loadAnimation("trex1.png","trex3.png","trex4.png")
cloudimg = loadImage("cloud.png")
gameoverimg = loadImage("gameOver.png")
ground2img = loadImage("ground2.png")
restartimg = loadImage("restart.png")
obstacle1 = loadImage("obstacle1.png") 
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png") 
obstacle4 = loadImage("obstacle4.png")
obstacle5 = loadImage("obstacle5.png")
obstacle6 = loadImage("obstacle6.png")
die = loadSound("die.mp3")
jump = loadSound("jump.mp3")
checkpoint = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(400, 400);
   trex = createSprite(200,380,20,50);
trex.addAnimation("trexrunning",treximage);

//set collision radius for the trex
trex.setCollider("circle",0,0,30);

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//trex.setCollider("rectangle",0,0,300,100);

//create a ground sprite
 ground = createSprite(200,380,400,20);
ground.addImage(ground2img);
ground.x = ground.width /2;

//invisible Ground to support Trex
 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
 ObstaclesGroup = createGroup();
 CloudsGroup = createGroup();

//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
 count = 0;
count.visible = true;

  gameOver = createSprite(200,260);
  restart = createSprite(200,340);
gameOver.addImage(gameoverimg);
gameOver.scale = 0.5;
restart.addImage(restartimg);
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false;

}

function draw() {
  //set background to white
  background("white");
  //display score
  text("Score: "+ count, 250, 100);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -6;
    //scoring
    count =count+ Math.round(getFrameRate()/60);
   
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12;
      jump.play()
    }
   if (count%100===0 &&count>0) {
checkPoint.play()
        
  }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
 die.play()
  //trex.velocityY = -12;
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    gameOver.visible = true;
    restart.visible = true;
    trex.pause();
    //change the trex animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
  }
  if (mousePressedOver(restart)) {
    gameState = PLAY;
    CloudsGroup.destroyEach();
    ObstaclesGroup.destroyEach();
    count.visible = false;
    gameOver.visible = false;
    restart.visible = false;
    count = 0;
    trex.play();
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -(6+count/100) ;
   
     
    
    //generate random obstacles
    var rand =Math.round( random(1,6));
   switch(rand){
     case 1:obstacle.addImage(obstacle1)
      break;
      case 2:obstacle.addImage(obstacle2)
        break;
        case 3:obstacle.addImage(obstacle3)
       break;
       case 4:obstacle.addImage(obstacle4)
       break;
       case 5:obstacle.addImage(obstacle5)
       break;
       case 6:obstacle.addImage(obstacle6)
      break;                    
          }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = random(280,320);
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
