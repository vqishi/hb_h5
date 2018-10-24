function animateCache(){
   var allBoxs = window.document.documentElement.querySelectorAll(".ani");
   // console.log(allBoxs);
   for(var i = 0; i < allBoxs.length ; i++){
   	  allBoxs[i].attributes["style"]?allBoxs[i].setAttribute("animate-style-cache",
	  	allBoxs[i].attributes["style"].value):allBoxs[i].setAttribute("animate-style-cache"," "),
	    allBoxs[i].style.visibility="hidden";
   }
} 

function animate(currentPage){
	  // clearAnimate();
    var　animateBoxs = window.document.documentElement.querySelectorAll('.pt-page')[currentPage].querySelectorAll(".ani");
    for(var i = 0 ; i < animateBoxs.length ;i++){
    	animateBoxs[i].style.visibility = "visible";
      var _function = animateBoxs[i].attributes["animate-function"]?animateBoxs[i].attributes["animate-function"].value:""; 
    	var effect = animateBoxs[i].attributes["animate-effect"]?animateBoxs[i].attributes["animate-effect"].value:"";
	    animateBoxs[i].className = animateBoxs[i].className+" "+effect+" "+"animated";
	    var style = animateBoxs[i].attributes["style"].value;
	    var duration = animateBoxs[i].attributes["animate-duration"]?animateBoxs[i].attributes["animate-duration"].value:"";
	    style = style+"animation-duration:"+duration+";-webkit-animation-duration:"+duration+";"
	    var delay=animateBoxs[i].attributes["animate-delay"]?animateBoxs[i].attributes["animate-delay"].value:"";
	    style = style+"animation-delay:"+delay+";-webkit-animation-delay:"+delay+";";
      style = style+"animation-timing-function:"+_function+";-webkit-animation-timing-function:"+_function+";";
	    animateBoxs[i].setAttribute("style",style);
	  }
     
}

function clearAnimate(page)
{   
  // console.log(page);
    var　animateBoxs = window.document.documentElement.querySelectorAll('.pt-page')[page].querySelectorAll(".ani");
    for(var i = 0 ; i < animateBoxs.length ;i++ ){
    	if(animateBoxs[i].attributes["animate-style-cache"]){
    	   animateBoxs[i].setAttribute("style",animateBoxs[i].attributes["animate-style-cache"].value);	
    	   animateBoxs[i].style.visibility="hidden";
    	}
        animateBoxs[i].className = animateBoxs[i].className.replace(" animated","");
	    if(animateBoxs[i].attributes["animate-effect"]){
	    	var effect = " "+animateBoxs[i].attributes["animate-effect"].value;
	    	animateBoxs[i].className = animateBoxs[i].className.replace(effect,"");
	    }
      if(animateBoxs[i].attributes["animate-effect-out"]){
        var effect = " "+animateBoxs[i].attributes["animate-effect-out"].value;
        animateBoxs[i].className = animateBoxs[i].className.replace(effect,"");
      }
    }
}
function clearAnimateOut()
{
    var allBoxs = window.document.documentElement.querySelectorAll(".ani");
    for(var i = 0 ; i < allBoxs.length ;i++ ){
      if(allBoxs[i].attributes["animate-style-cache"]){
         // allBoxs[i].setAttribute("style",allBoxs[i].attributes["animate-style-cache"].value); 
         // allBoxs[i].style.visibility="hidden";
      }
      allBoxs[i].setAttribute("style","");
      allBoxs[i].className = allBoxs[i].className.replace(" animated","");
      if(allBoxs[i].attributes["animate-effect"]){
        var effect = " "+allBoxs[i].attributes["animate-effect"].value;
        allBoxs[i].className = allBoxs[i].className.replace(effect,"");
      }

    }
}

function animateOut(currentPage){
    clearAnimateOut()
    var　animateBoxs = window.document.documentElement.querySelectorAll('.pt-page')[currentPage].querySelectorAll(".ani");
    for(var i = 0 ; i < animateBoxs.length ;i++){
      animateBoxs[i].style.visibility = "visible";
      
      var effect = animateBoxs[i].attributes["animate-effect-out"]?animateBoxs[i].attributes["animate-effect-out"].value:"";
      animateBoxs[i].className = animateBoxs[i].className+" "+effect+" "+"animated";
      var style = animateBoxs[i].attributes["style"].value;
      var duration = animateBoxs[i].attributes["animate-duration-out"]?animateBoxs[i].attributes["animate-duration-out"].value:"";
      style = style+"animation-duration:"+duration+";-webkit-animation-duration:"+duration+";"
      var delay=animateBoxs[i].attributes["animate-delay-out"]?animateBoxs[i].attributes["animate-delay-out"].value:"";
      style = style+"animation-delay:"+delay+";-webkit-animation-delay:"+delay+";";
      animateBoxs[i].setAttribute("style",style);
    }
}