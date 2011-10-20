if(typeof(twitterAccount)!="string"||twitterAccount=="")var twitterAccount="http://twitter.com/";
if(typeof(tweetThisText)!="string"||tweetThisText=="")var tweetThisText=document.title+" "+document.URL;

var birdSpeed=50;
var birdSpaceVertical=16;
var spriteWidth=64;
var spriteHeight=64;
var spriteAniSpeed=72;
var spriteAniSpeedSlow=Math.round(spriteAniSpeed*1.75);

var neededElems4random=10;
var minElemWidth=Math.round(spriteWidth/3);
var scareTheBirdMouseOverTimes=1; // number of quick hovers (n+1) needed to scare the bird
var scareTheBirdTime=4000; // two hovers faster than this scare the bird
var scrollPos=0;

var windowHeight=450;
if(typeof(window.innerHeight)=="number")windowHeight=window.innerHeight;
else if(document.documentElement&&document.documentElement.clientHeight)windowHeight=document.documentElement.clientHeight;
else if(document.body&&document.body.clientHeight)windowHeight=document.body.clientHeight;
if(windowHeight<=spriteHeight+2*birdSpaceVertical)windowHeight=spriteHeight+2*birdSpaceVertical+1;
var windowWidth=800;
if(typeof(window.innerWidth)=="number")windowWidth=window.innerWidth;
else if(document.documentElement&&document.documentElement.clientWidth)windowWidth=document.documentElement.clientWidth;
else if(document.body&&document.body.clientWidth)windowWidth=document.body.clientWidth;
if(windowWidth<=spriteWidth)windowWidth=spriteWidth+1;

function Tappy(tappyId){
// original tappy position (off screen)
  this.birdPosX = -2*spriteWidth;
  this.birdPosY = Math.round(Math.random()*(windowHeight-spriteHeight+200));
  this.timeoutAnimation=false;
  this.showButtonsTimeout=null;
  this.hideButtonsTimeout=null;

  this.birdIsFlying=false;
  this.tripleFlapInit();
  this.myId = tappyId;
  this.theBird = document.createElement("a");
  this.theBird.setAttribute("id", this.myId);
  this.theBird.setAttribute("href",twitterAccount);
  this.theBird.setAttribute("target","_blank");
  this.theBird.style.display="block";
  this.theBird.style.position="absolute";
  this.theBird.style.left=this.birdPosX+"px";
  this.theBird.style.top=this.birdPosY+"px";
  this.theBird.style.width=spriteWidth+"px";
  this.theBird.style.height=spriteHeight+"px";
  this.theBird.style.background="url('"+birdSprite+"') no-repeat transparent";
  this.theBird.style.backgroundPosition="-0px -0px";
  this.theBird.style.zIndex="947";

  var self = this;
  this.theBird.onmouseover = function(){
    self.scareTheBird();
    // showButtonsTimeout=window.setTimeout("showButtons(0,"+windowWidth+")",400);
    window.clearTimeout(function(){self.hideButtonsTimeout();});
  };
  this.theBird.onmouseout=function(){
    self.hideButtonsTimeout=window.setTimeout(function(){self.hideButtons();},50);
  };
  document.body.appendChild(this.theBird);
}
Tappy.prototype.tripleFlapInit = function(reallystart){
  var self = this;
  if(typeof(reallystart)=="undefined"){
    window.setTimeout(function(){self.tripleFlapInit(1);},250);
    return;
  }
  // if(!is_utf8(tweetThisText))tweetThisText=utf8_encode(tweetThisText);
  // var tweetthislink = "http://twitter.com/home?status="+escape(tweetThisText);
  // var theBirdLtweet=document.createElement("a");
  // theBirdLtweet.setAttribute("id","theBirdLtweet");
  // theBirdLtweet.setAttribute("href",tweetthislink);
  // theBirdLtweet.setAttribute("target","_blank");
  // theBirdLtweet.setAttribute("title","tweet this");
  // theBirdLtweet.style.display="none";
  // theBirdLtweet.style.position="absolute";
  // theBirdLtweet.style.left="0px";
  // theBirdLtweet.style.top="-100px";
  // theBirdLtweet.style.background="url('"+birdSprite+"') no-repeat transparent";
  // theBirdLtweet.style.opacity="0";
  // theBirdLtweet.style.filter="alpha(opacity=0)";
  // theBirdLtweet.style.backgroundPosition="-64px -0px";
  // theBirdLtweet.style.width="58px";
  // theBirdLtweet.style.height="30px";
  // theBirdLtweet.style.zIndex="951";
  // theBirdLtweet.onmouseover=function(){window.clearTimeout(hideButtonsTimeout);};
  // theBirdLtweet.onmouseout=function(){hideButtonsTimeout=window.setTimeout(function(){self.hideButtons();},50);};
  // document.body.appendChild(theBirdLtweet);
  // var theBirdLfollow=theBirdLtweet.cloneNode(false);
  // theBirdLfollow.setAttribute("id","theBirdLfollow");
  // theBirdLfollow.setAttribute("href",twitterAccount);
  // theBirdLfollow.setAttribute("title","follow me");
  // theBirdLfollow.style.backgroundPosition="-64px -30px";
  // theBirdLfollow.style.width="58px";
  // theBirdLfollow.style.height="20px";
  // theBirdLfollow.style.zIndex="952";
  // theBirdLfollow.onmouseover=function(){window.clearTimeout(hideButtonsTimeout);};
  // theBirdLfollow.onmouseout=function(){hideButtonsTimeout=window.setTimeout(function(){self.hideButtons();},50);};
  // document.body.appendChild(theBirdLfollow);
  self.timeoutAnimation=window.setTimeout(function(){self.poseTappy(0,0);},spriteAniSpeed);
  // window.onscroll=function(){self.recheckPosition();};
  window.addEventListener("scroll", function(){self.recheckPosition();}, false);

  self.recheckPosition();
};

Tappy.prototype.animateSprite = function(row, posStart, posEnd, count, speed){
  if(typeof(count)!="number"||count>posEnd-posStart)count=0;
  this.poseTappy(row, (posStart+count));
  if(typeof(speed)!="number")speed=spriteAniSpeed;
  var self = this;
  self.timeoutAnimation = window.setTimeout(function(){self.animateSprite(row,posStart,posEnd,(count+1),speed);},speed);
};

Tappy.prototype.poseTappy = function(row,column){
  var bgPosition = "-"+Math.round(column*spriteWidth)+"px -"+(spriteHeight*row)+"px";
  this.theBird.style.backgroundPosition = bgPosition;
};

Tappy.prototype.updatePosition = function(){
  this.birdPosX = parseInt(this.theBird.style.left);
  this.birdPosY = parseInt(this.theBird.style.top);
};

Tappy.prototype.positionTappy = function(x, y){
  this.theBird.style.left = x     + "px";
  this.theBird.style.top  = (y+2) + "px";
};

Tappy.prototype.animateSpriteAbort = function(){
  var self = this;
  window.clearTimeout(self.timeoutAnimation);
};

Tappy.prototype.recheckPosition = function(force){ // make sure tappy is on screen
  var self = this;
  if(force!=true)force=false;
  if(self.birdIsFlying)
    return false;
  if(typeof(window.innerHeight)=="number")windowHeight=window.innerHeight;
  else if(document.documentElement&&document.documentElement.clientHeight)windowHeight=document.documentElement.clientHeight;
  else if(document.body&&document.body.clientHeight)windowHeight=document.body.clientHeight;
  if(windowHeight<=spriteHeight+2*birdSpaceVertical)windowHeight=spriteHeight+2*birdSpaceVertical+1;
  if(typeof(window.innerWidth)=="number")windowWidth=window.innerWidth;
  else if(document.documentElement&&document.documentElement.clientWidth)windowWidth=document.documentElement.clientWidth;
  else if(document.body&&document.body.clientWidth)windowWidth=document.body.clientWidth;
  if(windowWidth<=spriteWidth)windowWidth=spriteWidth+1;
  if(typeof(window.pageYOffset)=="number")scrollPos=window.pageYOffset;
  else if(document.body&&document.body.scrollTop)scrollPos=document.body.scrollTop;
  else if(document.documentElement&&document.documentElement.scrollTop)scrollPos=document.documentElement.scrollTop;
  self.updatePosition();
console.log(scrollPos+' + '+birdSpaceVertical+' >= '+this.birdPosY);
console.log(scrollPos+' + '+windowHeight+' - '+spriteHeight+ ' < '+this.birdPosY);
  if(self.tappyNotOnScreen() || force){
    self.hideButtons();
    self.gotoTarget(self.randomTarget());
  }
};

Tappy.prototype.tappyNotOnScreen = function(){
  return scrollPos+birdSpaceVertical>=this.birdPosY ||
         scrollPos+windowHeight-spriteHeight<this.birdPosY ||
         this.birdPosX < 0;
};

Tappy.prototype.gotoTarget = function(newTarget){
  var targetTop  = 0;
  var targetLeft = 0;
  if(newTarget){
    targetTop = newTarget[2] - spriteHeight;
    targetLeft = Math.round(newTarget[3]-spriteWidth/2+Math.random()*newTarget[4]);
  } else {
    targetTop = (scrollPos + Math.round(Math.random()*(windowHeight-spriteHeight)) - spriteHeight);
    targetLeft = Math.round(Math.round(Math.random()*(windowWidth-spriteWidth)) - spriteWidth/2)
  }
  targetLeft = Math.min(Math.max(targetLeft, 0), windowWidth-spriteWidth-24);
  self.birdIsFlying=true;
  this.flyFromTo(this.birdPosX,this.birdPosY,targetLeft,targetTop,0);
};

Tappy.prototype.randomTarget = function(){
  var targets = this.availableTargets();
  return targets[Math.round(Math.random()*(targets.length-1))];
};

Tappy.prototype.availableTargets = function(){
  var elemPosis = new Array();
  var obergrenze  = scrollPos+spriteHeight+birdSpaceVertical;
  var untergrenze = scrollPos+windowHeight-birdSpaceVertical;
  for(var ce=0;ce<targetElems.length;ce++){
    var elemType = targetElems[ce];
    var sumElem=document.getElementsByTagName(elemType).length;
    for(var cu=0;cu<sumElem;cu++){
      var el = document.getElementsByTagName(elemType)[cu];
      if(el.offsetTop<=obergrenze || el.offsetTop>=untergrenze || el.offsetWidth<minElemWidth || el.offsetLeft<0){
        continue;
      }
      elemPosis[elemPosis.length] = new Array(elemType,cu,el.offsetTop,el.offsetLeft,el.offsetWidth);
      if(elemPosis.length>=neededElems4random)
        return elemPosis;
    }
  }
  return elemPosis;
};

Tappy.prototype.distanceNextFrame = function(distanceSoFar){
  if (distanceSoFar>birdSpeed/2) { // full speed
    return birdSpeed;
  } else if (distanceSoFar>0){     // gaining momentum
    return Math.round(birdSpeed/2);
  } else {                         // just starting; start slow
    return Math.round(birdSpeed/4);
  }
};

Tappy.prototype.flyFromTo = function(startX,startY,targetX,targetY,distanceSoFar,direction){
  var self = this;
  self.birdIsFlying = true;
  this.hideButtons();

  var justStarted = (distanceSoFar==0);
  distanceSoFar += this.distanceNextFrame(distanceSoFar);
  var distanceOfTravelX = targetX-startX;
  var distanceOfTravelY = targetY-startY;
  var distanceOfTravel = hypotenuse(distanceOfTravelX, distanceOfTravelY);

  var angle = ((distanceOfTravelX!=0) ? Math.atan((-distanceOfTravelY)/distanceOfTravelX)/Math.PI*180:90) + ((distanceOfTravelX<0)?180:0);
  direction = this.findDirection(direction, angle);

  var percentComplete = Math.abs(distanceSoFar/distanceOfTravel);
  if(percentComplete < 1.0){
    if(this.nextFrameIsFinalFrame(distanceSoFar, distanceOfTravel)) this.prepareForStopAnimation(direction);

    if(justStarted) this.showSpriteForDirectionNew(direction);
    var nextCall = function(){self.flyFromTo(startX,startY,targetX,targetY,distanceSoFar,direction)};
    window.setTimeout(nextCall, 50);

    var distanceSoFarX = Math.round(distanceOfTravelX*percentComplete);
    var distanceSoFarY = Math.round(distanceOfTravelY*percentComplete);
    this.positionTappy(startX + distanceSoFarX, startY + distanceSoFarY);
  }else{
    self.birdIsFlying = false;
    window.setTimeout(function(){self.recheckPosition();}, 500);
    this.positionTappy(targetX, targetY);
  }
};

Tappy.prototype.nextFrameIsFinalFrame = function(distanceSoFar, distanceOfTravel){
  var nextDistanceSoFar   = (distanceSoFar + this.distanceNextFrame(distanceSoFar));
  var nextPercentComplete = Math.abs(nextDistanceSoFar/distanceOfTravel);
  return (nextPercentComplete >= 1.0);
};

Tappy.prototype.scareTheBirdLastTime=0;
Tappy.prototype.scareTheBirdCount=0;
Tappy.prototype.scareTheBird = function(){
  newTS = new Date().getTime();
  if(this.scareTheBirdLastTime < newTS-scareTheBirdTime){
    this.scareTheBirdCount = 1;
    this.scareTheBirdLastTime = newTS;
  }else{
    this.scareTheBirdCount++;
    if(this.scareTheBirdCount >= scareTheBirdMouseOverTimes){
      this.scareTheBirdCount = 0;
      this.scareTheBirdLastTime = 0;
      // recheckPosition(true);
      this.flyOff();
    }
  }
};

Tappy.prototype.flyOff = function(){
  this.updatePosition();
  this.flyFromTo(this.birdPosX,this.birdPosY,-900,-300,0);
};

Tappy.prototype.showButtons = function(step,minWidth){
  return;
  var self = this;
  self.updatePosition();
  if(step==0&&document.getElementById("theBirdLtweet").style.display=="block")step=100;
  if(self.birdIsFlying)step=0;
  opacity=Math.round(step*15);
  if(opacity<0)opacity=0;
  else if(opacity>100)opacity=100;
  if(self.birdPosX<minWidth-300||self.birdPosX<minWidth/2){
    buttonPosX1=self.birdPosX+spriteWidth-15;
    buttonPosX2=self.birdPosX+spriteWidth-10;
  } else{
    buttonPosX1=self.birdPosX+16-parseInt(document.getElementById("theBirdLtweet").style.width);
    buttonPosX2=self.birdPosX+11-parseInt(document.getElementById("theBirdLfollow").style.width);
  }
  buttonPosY1=self.birdPosY-4;
  buttonPosY2=self.birdPosY-4+parseInt(document.getElementById("theBirdLtweet").style.height);
  document.getElementById("theBirdLtweet").style.left=buttonPosX1+"px";
  document.getElementById("theBirdLtweet").style.top=buttonPosY1+"px";
  document.getElementById("theBirdLtweet").style.display="block";
  document.getElementById("theBirdLtweet").style.opacity=opacity/100;
  document.getElementById("theBirdLtweet").style.filter="alpha(opacity="+opacity+")";
  document.getElementById("theBirdLfollow").style.left=buttonPosX2+"px";
  document.getElementById("theBirdLfollow").style.top=buttonPosY2+"px";
  document.getElementById("theBirdLfollow").style.display="block";
  document.getElementById("theBirdLfollow").style.opacity=opacity/100;
  document.getElementById("theBirdLfollow").style.filter="alpha(opacity="+opacity+")";
  if(opacity>=100)return;
  step++;
  self.showButtonsTimeout=window.setTimeout(function(){self.showButtons(step,minWidth);},60);
};

Tappy.prototype.hideButtons = function(){
  window.clearTimeout(this.showButtonsTimeout);
  // document.getElementById("theBirdLtweet").style.display="none";
  // document.getElementById("theBirdLtweet").style.opacity="0";
  // document.getElementById("theBirdLtweet").style.filter="alpha(opacity=0)";
  // document.getElementById("theBirdLfollow").style.display="none";
  // document.getElementById("theBirdLfollow").style.opacity="0";
  // document.getElementById("theBirdLfollow").style.filter="alpha(opacity=0)";
};

Tappy.prototype.findDirection = function(direction, angle){
  // TODO make sure direction string passed is valid
  // var validDirections = ['o', 'n', 'w', 'sw', 's', 'so'];
  if(typeof(direction) !== "string"){
    direction=null;
    if(angle<0)angle+=360;
    if(angle<45)direction='o';
    else if(angle<135)direction='n';
    else if(angle<202.5)direction='w';
    else if(angle<247.5)direction='sw';
    else if(angle<292.5)direction='s';
    else if(angle<337.5)direction='so';
    else direction='o';
  }
  return direction;
};

Tappy.prototype.prepareForStopAnimation = function(direction){
  var self = this;
  self.animateSpriteAbort();
  switch(direction){
    case 'so':self.poseTappy(1,0);break;
    case 'sw':self.poseTappy(1,2);break;
    case 's': self.poseTappy(0,2);break;
    case 'n': self.poseTappy(4,0);break;
    case 'o': self.poseTappy(1,0);break;
    case 'w': self.poseTappy(1,2);break;
    default:  self.poseTappy(0,0);
  }
  self.timeoutAnimation=window.setTimeout(function(){self.poseTappy(0,0);},spriteAniSpeed);
};

Tappy.prototype.showSpriteForDirectionNew = function(direction){
  var self = this;
  self.animateSpriteAbort();
  switch(direction){
    case 'so':
      self.poseTappy(1,0);
      self.timeoutAnimation=window.setTimeout(function(){self.poseTappy(1,1);},spriteAniSpeed);break;
    case 'sw':
      self.poseTappy(1,2);
      self.timeoutAnimation=window.setTimeout(function(){self.poseTappy(1,3);},spriteAniSpeed);break;
    case 's':
      self.poseTappy(0,2);
      self.timeoutAnimation=window.setTimeout(function(){self.poseTappy(0,3);},spriteAniSpeed);break;
    case 'n':
      self.timeoutAnimation=window.setTimeout(function(){self.animateSprite(4,0,3,0,spriteAniSpeedSlow);},1);break;
    case 'o':
      self.poseTappy(1,0);
      self.timeoutAnimation=window.setTimeout(function(){self.animateSprite(2,0,3,0,spriteAniSpeedSlow);},spriteAniSpeed);break;
    case 'w':
      self.poseTappy(1,2);
      self.timeoutAnimation=window.setTimeout(function(){self.animateSprite(3,0,3,0,spriteAniSpeedSlow);},spriteAniSpeed);break;
    default:  self.poseTappy(0,0);
  }
};

function utf8_encode(str){
  str=str.replace(/\r\n/g,"\n");
  utf8str="";
  for(n=0;n<str.length;n++){
    c=str.charCodeAt(n);
    if(c<128){
      utf8str+=String.fromCharCode(c);
    }
    else if(c>127&&c<2048){
      utf8str+=String.fromCharCode((c>>6)|192);
      utf8str+=String.fromCharCode((c&63)|128);
    }
    else{
      utf8str+=String.fromCharCode((c>>12)|224);
      utf8str+=String.fromCharCode(((c>>6)&63)|128);
      utf8str+=String.fromCharCode((c&63)|128);
    }
  }
  return utf8str;
}

function is_utf8(str){
  strlen=str.length;
  for(i=0;i<strlen;i++){
    ord=str.charCodeAt(i);
    if(ord<0x80)continue;
    else if((ord&0xE0)===0xC0&&ord>0xC1)n=1;
    else if((ord&0xF0)===0xE0)n=2;
    else if((ord&0xF8)===0xF0&&ord<0xF5)n=3;
    else return false;
    for(c=0;c<n;c++)
      if(++i===strlen||(str.charCodeAt(i)&0xC0)!==0x80)
        return false;
  }
  return true;
}

function hypotenuse(x,y){
  return Math.sqrt(x*x + y*y);
}
