function screenMate(w) {
  var phoneWidth = parseInt(window.screen.width);
  var phoneScale = phoneWidth/w;
  var ua = navigator.userAgent;
  if(/Android (\d+\.\d+)/.test(ua)){
      var version =  parseFloat(RegExp.$1);
      if(version > 2.3){
            document.write('<meta name="viewport" content="width='+w+', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
      }else{
            document.write('<meta name="viewport" content="width='+w+', target-densitydpi=device-dpi">');
      }
  }else{
     document.write('<meta name="viewport" content="width='+w+', user-scalable=no, target-densitydpi=device-dpi">');
  }
}
screenMate(640);