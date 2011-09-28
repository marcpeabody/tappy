if(typeof(twitterAccount)!="string"||twitterAccount=="")var twitterAccount="http://twitter.com/";
if(typeof(tweetThisText)!="string"||tweetThisText=="")var tweetThisText=document.title+" "+document.URL;
var tweetthislink=null;

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
var birdIsFlying=false;
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
// original tappy position (off screen)
console.log(windowWidth);
var birdPosX=-2*spriteWidth;
//Math.round(Math.random()*(windowWidth-spriteWidth+200)-200);
var birdPosY=Math.round(Math.random()*(windowHeight-spriteHeight+200));
//-2*spriteHeight;
console.log("x: "+birdPosX+"  y:"+birdPosY);
var timeoutAnimation=false;
var timeoutFlight=false;
var showButtonsTimeout=null;
var hideButtonsTimeout=null;
var scareTheBirdLastTime=0;
var scareTheBirdCount=0;

function tripleflapInit(reallystart){
  if(typeof(reallystart)=="undefined"){
    window.setTimeout("tripleflapInit(1)",250);
    return;
  }
  if(!is_utf8(tweetThisText))tweetThisText=utf8_encode(tweetThisText);
  var tweetthislink="http://twitter.com/home?status="+escape(tweetThisText);
  var theBird=document.createElement("a");
  theBird.setAttribute("id","theBird");
  theBird.setAttribute("href",twitterAccount);
  theBird.setAttribute("target","_blank");
  theBird.style.display="block";
  theBird.style.position="absolute";
  theBird.style.left=birdPosX+"px";
  theBird.style.top=birdPosY+"px";
  theBird.style.width=spriteWidth+"px";
  theBird.style.height=spriteHeight+"px";
  theBird.style.background="url('"+birdSprite+"') no-repeat transparent";
  theBird.style.backgroundPosition="-0px -0px";
  theBird.style.zIndex="947";
  theBird.onmouseover=function(){scareTheBird();showButtonsTimeout=window.setTimeout("showButtons(0,"+windowWidth+")",400);window.clearTimeout(hideButtonsTimeout);};
  theBird.onmouseout=function(){hideButtonsTimeout=window.setTimeout("hideButtons()",50);};
  document.body.appendChild(theBird);
  var theBirdLtweet=document.createElement("a");
  theBirdLtweet.setAttribute("id","theBirdLtweet");
  theBirdLtweet.setAttribute("href",tweetthislink);
  theBirdLtweet.setAttribute("target","_blank");
  theBirdLtweet.setAttribute("title","tweet this");
  theBirdLtweet.style.display="none";
  theBirdLtweet.style.position="absolute";
  theBirdLtweet.style.left="0px";
  theBirdLtweet.style.top="-100px";
  theBirdLtweet.style.background="url('"+birdSprite+"') no-repeat transparent";
  theBirdLtweet.style.opacity="0";
  theBirdLtweet.style.filter="alpha(opacity=0)";
  theBirdLtweet.style.backgroundPosition="-64px -0px";
  theBirdLtweet.style.width="58px";
  theBirdLtweet.style.height="30px";
  theBirdLtweet.style.zIndex="951";
  theBirdLtweet.onmouseover=function(){window.clearTimeout(hideButtonsTimeout);};
  theBirdLtweet.onmouseout=function(){hideButtonsTimeout=window.setTimeout("hideButtons()",50);};
  document.body.appendChild(theBirdLtweet);
  var theBirdLfollow=theBirdLtweet.cloneNode(false);
  theBirdLfollow.setAttribute("id","theBirdLfollow");
  theBirdLfollow.setAttribute("href",twitterAccount);
  theBirdLfollow.setAttribute("title","follow me");
  theBirdLfollow.style.backgroundPosition="-64px -30px";
  theBirdLfollow.style.width="58px";
  theBirdLfollow.style.height="20px";
  theBirdLfollow.style.zIndex="952";
  theBirdLfollow.onmouseover=function(){window.clearTimeout(hideButtonsTimeout);};
  theBirdLfollow.onmouseout=function(){hideButtonsTimeout=window.setTimeout("hideButtons()",50);};
  document.body.appendChild(theBirdLfollow);
  var timeoutAnimation=window.setTimeout("animateSprite(0,0,0,0,null,true)",spriteAniSpeed);
  window.onscroll=recheckposition;
  recheckposition();
}
function animateSprite(row,posStart,posEnd,count,speed,onlySet){
  if(typeof(count)!="number"||count>posEnd-posStart)count=0;
  document.getElementById("theBird").style.backgroundPosition="-"+Math.round((posStart+count)*spriteWidth)+"px -"+(spriteHeight*row)+"px";
  if(onlySet==true)return;
  if(typeof(speed)!="number")speed=spriteAniSpeed;
  timeoutAnimation=window.setTimeout("animateSprite("+row+","+posStart+","+posEnd+","+(count+1)+","+speed+")",speed);
}
function animateSpriteAbort(){
  window.clearTimeout(timeoutAnimation);
}
function recheckposition(force){ // make sure tappy is on screen
  console.log('recheck '+force);
  if(force!=true)force=false;
  if(birdIsFlying)
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
  updatePosition();
  var tappyNotOnScreen = scrollPos+birdSpaceVertical>=birdPosY ||
                         scrollPos+windowHeight-spriteHeight<birdPosY ||
                         birdPosX < 0;
console.log(scrollPos+' + '+birdSpaceVertical+' >= '+birdPosY);
console.log(scrollPos+' + '+windowHeight+' - '+spriteHeight+ ' < '+birdPosY);
console.log("offscreen? "+tappyNotOnScreen);
  if(tappyNotOnScreen||force){
    hideButtons();
    elemPosis=chooseNewTarget();
    if(elemPosis.length<1){
      elemType=null;
      elemNr=null;
      elemTop=scrollPos+Math.round(Math.random()*(windowHeight-spriteHeight));
      elemLeft=Math.round(Math.random()*(windowWidth-spriteWidth));
      elemWidth=0;
    }else{
      newTarget=elemPosis[Math.round(Math.random()*(elemPosis.length-1))];
      elemType=newTarget[0];
      elemNr=newTarget[1];
      elemTop=newTarget[2];
      elemLeft=newTarget[3];
      elemWidth=newTarget[4];
    }
    targetTop=elemTop-spriteHeight;
    targetLeft=Math.round(elemLeft-spriteWidth/2+Math.random()*elemWidth);
    if(targetLeft>windowWidth-spriteWidth-24)
      targetLeft=windowWidth-spriteWidth-24;
    else if(targetLeft<0)
      targetLeft=0;
    birdIsFlying=true;
    flyFromTo(birdPosX,birdPosY,targetLeft,targetTop,0);
console.log("x: "+birdPosX+"  y:"+birdPosY);
  }
}

function thud(){
  // fly into side of screen
  // display thud
  // chooseNewTarget
}

function chooseNewTarget(){
  var elemPosis=new Array();
  var obergrenze=scrollPos+spriteHeight+birdSpaceVertical;
  var untergrenze=scrollPos+windowHeight-birdSpaceVertical;
  for(var ce=0;ce<targetElems.length;ce++){
    var elemType=targetElems[ce];
    var sumElem=document.getElementsByTagName(elemType).length;
    for(var cu=0;cu<sumElem;cu++){
      var top=document.getElementsByTagName(elemType)[cu].offsetTop;
      var left=document.getElementsByTagName(elemType)[cu].offsetLeft;
      var width=document.getElementsByTagName(elemType)[cu].offsetWidth;
      if(top<=obergrenze||top>=untergrenze||width<minElemWidth||left<0){
        continue;
      }
      elemPosis[elemPosis.length]=new Array(elemType,cu,top,left,width);
      if(elemPosis.length>=neededElems4random)
        return elemPosis;
    }
  }
  return elemPosis;
}
function distanceNextFrame(distanceSoFar){
  if (distanceSoFar>birdSpeed/2) { // full speed
    return birdSpeed;
  } else if (distanceSoFar>0){     // gaining momentum
    return Math.round(birdSpeed/2);
  } else {                         // just starting; start slow
    return Math.round(birdSpeed/4);
  }
}

function thud(){

}

function flyFromTo(startX,startY,targetX,targetY,distanceSoFar,direction){
  birdIsFlying = true;
  hideButtons();

  var justStarted = (distanceSoFar==0);
  distanceSoFar += distanceNextFrame(distanceSoFar);
  var distanceOfTravelX = targetX-startX;
  var distanceOfTravelY = targetY-startY;
  var distanceOfTravel = hypotenuse(distanceOfTravelX, distanceOfTravelY);

  var angle = ((distanceOfTravelX!=0) ? Math.atan((-distanceOfTravelY)/distanceOfTravelX)/Math.PI*180:90) + ((distanceOfTravelX<0)?180:0);
  direction = findDirection(direction, angle);

  var percentComplete = Math.abs(distanceSoFar/distanceOfTravel);
  if(percentComplete < 1.0){
    if(nextFrameIsFinalFrame(distanceSoFar, distanceOfTravel)) prepareForStopAnimation(direction);

    if(justStarted) showSpriteForDirectionNew(direction);
    var nextCall = "flyFromTo("+startX+","+startY+","+targetX+","+targetY+","+distanceSoFar+",'"+direction+"')";
    timeoutFlight = window.setTimeout(nextCall, 50);

    var distanceSoFarX = Math.round(distanceOfTravelX*percentComplete);
    var distanceSoFarY = Math.round(distanceOfTravelY*percentComplete);
    positionTappy(startX + distanceSoFarX, startY + distanceSoFarY);
  }else{
    birdIsFlying = false;
    window.setTimeout("recheckposition()",500);
    positionTappy(targetX, targetY);
  }
}

function hypotenuse(x,y){
  return Math.sqrt(x*x + y*y);
}

function nextFrameIsFinalFrame(distanceSoFar, distanceOfTravel){
  var nextDistanceSoFar   = (distanceSoFar + distanceNextFrame(distanceSoFar));
  var nextPercentComplete = Math.abs(nextDistanceSoFar/distanceOfTravel);
  return (nextPercentComplete >= 1.0);
}
// function nextFrameIsFinalFrame(distanceSoFar, distanceNeeded, distanceOfTravelX, distanceOfTravelY){
//   var solvedFuture    = distanceSoFar + distanceNextFrame(distanceSoFar);
//   var solvPercFuture  = Math.abs(solvedFuture/distanceNeeded);
//   var solvDistXFuture = Math.round(distanceOfTravelX*solvPercFuture);
//   var solvDistYFuture = Math.round(distanceOfTravelY*solvPercFuture);
// 
//   var moreFlying = Math.abs(solvDistXFuture) >= Math.abs(distanceOfTravelX) &&
//                    Math.abs(solvDistYFuture) >= Math.abs(distanceOfTravelY);
//   return moreFlying;
// }

function positionTappy(x, y){
  document.getElementById("theBird").style.left = x + "px";
  document.getElementById("theBird").style.top  = (y+2) + "px";
}

function scareTheBird(nul){
  newTS=new Date().getTime();
  if(scareTheBirdLastTime<newTS-scareTheBirdTime){
    scareTheBirdCount=1;
    scareTheBirdLastTime=newTS;
  }else{
    scareTheBirdCount++;
    if(scareTheBirdCount>=scareTheBirdMouseOverTimes){
      scareTheBirdCount=0;
      scareTheBirdLastTime=0;
      // recheckposition(true);
      flyOff();
    }
  }
}

function updatePosition(){
  birdPosX=parseInt(document.getElementById("theBird").style.left);
  birdPosY=parseInt(document.getElementById("theBird").style.top);
}

function flyOff(){
  updatePosition();
  flyFromTo(birdPosX,birdPosY,-900,-300,0);
}

function showButtons(step,minWidth){
  return;
  updatePosition();
  if(step==0&&document.getElementById("theBirdLtweet").style.display=="block")step=100;
  if(birdIsFlying)step=0;
  opacity=Math.round(step*15);
  if(opacity<0)opacity=0;
  if(opacity>100)opacity=100;
  if(birdPosX<minWidth-300||birdPosX<minWidth/2){
    buttonPosX1=birdPosX+spriteWidth-15;
    buttonPosX2=birdPosX+spriteWidth-10;
  }
  else{
    buttonPosX1=birdPosX+16-parseInt(document.getElementById("theBirdLtweet").style.width);
    buttonPosX2=birdPosX+11-parseInt(document.getElementById("theBirdLfollow").style.width);
  }
  buttonPosY1=birdPosY-4;
  buttonPosY2=birdPosY-4+parseInt(document.getElementById("theBirdLtweet").style.height);
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
  showButtonsTimeout=window.setTimeout("showButtons("+step+","+minWidth+")",60);
}

function hideButtons(){
  window.clearTimeout(showButtonsTimeout);
  document.getElementById("theBirdLtweet").style.display="none";
  document.getElementById("theBirdLtweet").style.opacity="0";
  document.getElementById("theBirdLtweet").style.filter="alpha(opacity=0)";
  document.getElementById("theBirdLfollow").style.display="none";
  document.getElementById("theBirdLfollow").style.opacity="0";
  document.getElementById("theBirdLfollow").style.filter="alpha(opacity=0)";
}

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

function findDirection(direction, angle){
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
}

function prepareForStopAnimation(direction){
  animateSpriteAbort();
  switch(direction){
    case 'so':animateSprite(1,0,0,0,null,true);break;
    case 'sw':animateSprite(1,2,2,0,null,true);break;
    case 's':animateSprite(0,2,2,0,null,true);break;
    case 'n':animateSprite(4,0,0,0,null,true);break;
    case 'o':animateSprite(1,0,0,0,null,true);break;
    case 'w':animateSprite(1,2,2,0,null,true);break;
    default:animateSprite(0,0,0,0,null,true);
  }
  timeoutAnimation=window.setTimeout("animateSprite(0,0,0,0,null,true)",spriteAniSpeed);
}
function showSpriteForDirectionNew(direction){
  animateSpriteAbort();
  switch(direction){
    case 'so':animateSprite(1,0,0,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(1,1,1,0,null,true)",spriteAniSpeed);break;
    case 'sw':animateSprite(1,2,2,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(1,3,3,0,null,true)",spriteAniSpeed);break;
    case 's':animateSprite(0,2,2,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(0,3,3,0,null,true)",spriteAniSpeed);break;
    case 'n':timeoutAnimation=window.setTimeout("animateSprite(4,0,3,0,"+spriteAniSpeedSlow+")",1);break;
    case 'o':animateSprite(1,0,0,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(2,0,3,0,"+spriteAniSpeedSlow+")",spriteAniSpeed);break;
    case 'w':animateSprite(1,2,2,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(3,0,3,0,"+spriteAniSpeedSlow+")",spriteAniSpeed);break;
    default:animateSprite(0,0,0,0,null,true);
  }
}
