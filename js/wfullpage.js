;(function(window,$){
     function Wfullpage(params){
     	 var _this = this;
         this.params = {
         	'downStyle':36,
    	    'upStyle':15,
    	    'noSwipe':'',
    	    'nextSwipe':"up",
    	    'prevSwipe':"down",
    	    'loop':true,
    	    'current':0,
    	    'container':'',
    	    'tips':'',
    	    'swipeContainer':$('body'),
    	    'onAnimateEnd':function(){},
    	    'onAnimateStart':function(){},
    	    'onInitEnd':function(){}
         }; 

         this.params = $.extend({},this.params,params);

         this.get = function(n){
          	  return this.params[n];
         }

         this.set = function(n,v){
              this.params[n] = v; 
         }
    };
   // PageTransitions over

   Wfullpage.prototype = {
        init : function(){
        	    var _this = this;
        	    var params = this.params;
				$pages = this.params.container.children( 'div.pt-page' );
				this.set('pages',$pages); 
				$iterate = $( '#iterateEffects' );
				this.set('animcursor',1); 
				this.set('pageCount',$pages.length); 
				this.set('isAnimating',false);
				this.set('endCurrPage',false);
                this.set('endNextPage',false);
				animEndEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				},
				// animation end event name
				this.set('animEndEventName', animEndEventNames[ Modernizr.prefixed( 'animation' ) ]);
				// support css animations
				this.set('support',Modernizr.cssanimations);

				$pages.each(function(){
                     var $page = $(this);
                     $page.data( 'originalClassList', $page.attr( 'class' ) );
				})
				// each over
				$pages.eq( params.current ).addClass( 'pt-page-current' );

		        params.swipeContainer.swipe(
		            {
		                swipe:function(event, direction, distance, duration, fingerCount) {//事件，方向，距离（像素为单位），时间，手指数量
				             
				             if(params.noSwipe){
                	            if(params.noSwipe == params.current + 1){
                		                 return false;
                	            }
                             }
                             // 判断是否禁用滑动 over

		                     if(direction == params.nextSwipe)//当向上滑动手指时令当前页面记数器加1
		                     {     
									if( params.isAnimating ) {
										return false;
									}

									return false;
									var options = {animation:params.upStyle}
									if(!params.loop){
		                               if(params.current == params.pageCount - 1){
		                               	  return false;
		                               }
									}
									_this.nextPage(options,'next');
		                     }
		                     else if(direction == params.prevSwipe){
									if( params.isAnimating ) {
										return false;
									}
									return false;
									var options = {animation:params.downStyle}
									if(!params.loop){
		                               if(params.current == 0){
		                               	  return false;
		                               }
									}
									_this.nextPage(options,'prev');

		                     }

		                }
		            }
		        );
		        if(params.tips){
                   this.createTips();
                   this.tipsChange();
		        }

		      // swipe over
		       if(params.onInitEnd){
			          params.onInitEnd();
		       } 
            // console.log(this.params);
        }, 
        // init over
        createTips: function() {
        	  var domStr = '';
              for(var i = 0; i< this.params.pageCount;i++){
              	   domStr += "<li></li>";
              }
             if(this.params.tips == 'horizontal'){
                var ulStr = "<ul class='tips tipsHorizontal'>"+domStr+"</ul>" ;
             }else{
                var ulStr = "<ul class='tips tipsVertical'>"+domStr+"</ul>" ;
             }
             this.params.container.append(ulStr);
             if(this.params.tips == 'vertical'){
             	var h =  $('.tipsVertical').height();
             	$('.tipsVertical').css({
             		marginTop:-parseInt(h/2)+'px',
             		top:'50%',
             	})
             }
        },

        tipsChange:function(){
        	 $('.tips li').css('background',"rgba(0,0,0,0.2)");
             $('.tips li').eq(this.params.current).css('background','#249ff1');
        },
        toPage :  function(toPage){
		     var options = {animation:this.params.upStyle,showPage:toPage}
		     this.nextPage(options,null);
	    },
	    toNextPage : function(){
	    	 var params = this.params;
	    	 var current = params.current;
	    	 if(params.current < params.pageCount-1){params.current++;}else{params.current = 0}
		     var options = {animation:this.params.upStyle,curFlag:true,cur:current}
	    	 this.nextPage(options,null);
	    },
		nextPage : function(options,direction) {
                var params = this.params;
                var _this = this;
				var animation = (options.animation) ? options.animation : options;

				if( params.isAnimating ) {
					return false;
				}

				this.set('isAnimating',true);
				
				var $currPage = params.pages.eq( params.current ),current = params.current;
				if(options.curFlag){
					$currPage = params.pages.eq( options.cur);
				}
				if(options.showPage){
					if( options.showPage < params.pageCount ) {
						current = options.showPage;
					} else {
						current = 0;
					}
				}else{

				  if(direction == 'prev'){
					if( params.current > 0 ) {
						--current;
					}
					else {
						current = params.pageCount-1;
					}
				  }else if(direction == 'next'){
					if( params.current < params.pageCount - 1 ) {
						++current;
					}else {
						current = 0;

					}
				  }
				}
				this.set('current',current);

				var $nextPage = params.pages.eq(current).addClass( 'pt-page-current' ),
					outClass = '', inClass = '';

				switch( animation ) {

					case 1:
						outClass = 'pt-page-moveToLeft';
						inClass = 'pt-page-moveFromRight';
						break;
					case 2:
						outClass = 'pt-page-moveToRight';
						inClass = 'pt-page-moveFromLeft';
						break;
					case 3:
						outClass = 'pt-page-moveToTop';
						inClass = 'pt-page-moveFromBottom';
						break;
					case 4:
						outClass = 'pt-page-moveToBottom';
						inClass = 'pt-page-moveFromTop';
						break;
					case 5:
						outClass = 'pt-page-fade';
						inClass = 'pt-page-moveFromRight pt-page-ontop';
						break;
					case 6:
						outClass = 'pt-page-fade';
						inClass = 'pt-page-moveFromLeft pt-page-ontop';
						break;
					case 7:
						outClass = 'pt-page-fade';
						inClass = 'pt-page-moveFromBottom pt-page-ontop';
						break;
					case 8:
						outClass = 'pt-page-fade';
						inClass = 'pt-page-moveFromTop pt-page-ontop';
						break;
					case 9:
						outClass = 'pt-page-moveToLeftFade';
						inClass = 'pt-page-moveFromRightFade';
						break;
					case 10:
						outClass = 'pt-page-moveToRightFade';
						inClass = 'pt-page-moveFromLeftFade';
						break;
					case 11:
						outClass = 'pt-page-moveToTopFade';
						inClass = 'pt-page-moveFromBottomFade';
						break;
					case 12:
						outClass = 'pt-page-moveToBottomFade';
						inClass = 'pt-page-moveFromTopFade';
						break;
					case 13:
						outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
						inClass = 'pt-page-moveFromRight';
						break;
					case 14:
						outClass = 'pt-page-moveToRightEasing pt-page-ontop';
						inClass = 'pt-page-moveFromLeft';
						break;
					case 15:
						outClass = 'pt-page-moveToTopEasing pt-page-ontop';
						inClass = 'pt-page-moveFromBottom';
						break;
					case 16:
						outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
						inClass = 'pt-page-moveFromTop';
						break;
					case 17:
						outClass = 'pt-page-scaleDown';
						inClass = 'pt-page-moveFromRight pt-page-ontop';
						break;
					case 18:
						outClass = 'pt-page-scaleDown';
						inClass = 'pt-page-moveFromLeft pt-page-ontop';
						break;
					case 19:
						outClass = 'pt-page-scaleDown';
						inClass = 'pt-page-moveFromBottom pt-page-ontop';
						break;
					case 20:
						outClass = 'pt-page-scaleDown';
						inClass = 'pt-page-moveFromTop pt-page-ontop';
						break;
					case 21:
						outClass = 'pt-page-scaleDown';
						inClass = 'pt-page-scaleUpDown pt-page-delay300';
						break;
					case 22:
						outClass = 'pt-page-scaleDownUp';
						inClass = 'pt-page-scaleUp pt-page-delay300';
						break;
					case 23:
						outClass = 'pt-page-moveToLeft pt-page-ontop';
						inClass = 'pt-page-scaleUp';
						break;
					case 24:
						outClass = 'pt-page-moveToRight pt-page-ontop';
						inClass = 'pt-page-scaleUp';
						break;
					case 25:
						outClass = 'pt-page-moveToTop pt-page-ontop';
						inClass = 'pt-page-scaleUp';
						break;
					case 26:
						outClass = 'pt-page-moveToBottom pt-page-ontop';
						inClass = 'pt-page-scaleUp';
						break;
					case 27:
						outClass = 'pt-page-scaleDownCenter';
						inClass = 'pt-page-scaleUpCenter pt-page-delay400';
						break;
					case 28:
						outClass = 'pt-page-rotateRightSideFirst';
						inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
						break;
					case 29:
						outClass = 'pt-page-rotateLeftSideFirst';
						inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
						break;
					case 30:
						outClass = 'pt-page-rotateTopSideFirst';
						inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
						break;
					case 31:
						outClass = 'pt-page-rotateBottomSideFirst';
						inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
						break;
					case 32:
						outClass = 'pt-page-flipOutRight';
						inClass = 'pt-page-flipInLeft pt-page-delay500';
						break;
					case 33:
						outClass = 'pt-page-flipOutLeft';
						inClass = 'pt-page-flipInRight pt-page-delay500';
						break;
					case 34:
						outClass = 'pt-page-flipOutTop';
						inClass = 'pt-page-flipInBottom pt-page-delay500';
						break;
					case 35:
						outClass = 'pt-page-flipOutBottom';
						inClass = 'pt-page-flipInTop pt-page-delay500';
						break;
					case 36:
						outClass = 'pt-page-rotateFall pt-page-ontop';
						inClass = 'pt-page-scaleUp';
						break;
					case 37:
						outClass = 'pt-page-rotateOutNewspaper';
						inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
						break;
					case 38:
						outClass = 'pt-page-rotatePushLeft';
						inClass = 'pt-page-moveFromRight';
						break;
					case 39:
						outClass = 'pt-page-rotatePushRight';
						inClass = 'pt-page-moveFromLeft';
						break;
					case 40:
						outClass = 'pt-page-rotatePushTop';
						inClass = 'pt-page-moveFromBottom';
						break;
					case 41:
						outClass = 'pt-page-rotatePushBottom';
						inClass = 'pt-page-moveFromTop';
						break;
					case 42:
						outClass = 'pt-page-rotatePushLeft';
						inClass = 'pt-page-rotatePullRight pt-page-delay180';
						break;
					case 43:
						outClass = 'pt-page-rotatePushRight';
						inClass = 'pt-page-rotatePullLeft pt-page-delay180';
						break;
					case 44:
						outClass = 'pt-page-rotatePushTop';
						inClass = 'pt-page-rotatePullBottom pt-page-delay180';
						break;
					case 45:
						outClass = 'pt-page-rotatePushBottom';
						inClass = 'pt-page-rotatePullTop pt-page-delay180';
						break;
					case 46:
						outClass = 'pt-page-rotateFoldLeft';
						inClass = 'pt-page-moveFromRightFade';
						break;
					case 47:
						outClass = 'pt-page-rotateFoldRight';
						inClass = 'pt-page-moveFromLeftFade';
						break;
					case 48:
						outClass = 'pt-page-rotateFoldTop';
						inClass = 'pt-page-moveFromBottomFade';
						break;
					case 49:
						outClass = 'pt-page-rotateFoldBottom';
						inClass = 'pt-page-moveFromTopFade';
						break;
					case 50:
						outClass = 'pt-page-moveToRightFade';
						inClass = 'pt-page-rotateUnfoldLeft';
						break;
					case 51:
						outClass = 'pt-page-moveToLeftFade';
						inClass = 'pt-page-rotateUnfoldRight';
						break;
					case 52:
						outClass = 'pt-page-moveToBottomFade';
						inClass = 'pt-page-rotateUnfoldTop';
						break;
					case 53:
						outClass = 'pt-page-moveToTopFade';
						inClass = 'pt-page-rotateUnfoldBottom';
						break;
					case 54:
						outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
						inClass = 'pt-page-rotateRoomLeftIn';
						break;
					case 55:
						outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
						inClass = 'pt-page-rotateRoomRightIn';
						break;
					case 56:
						outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
						inClass = 'pt-page-rotateRoomTopIn';
						break;
					case 57:
						outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
						inClass = 'pt-page-rotateRoomBottomIn';
						break;
					case 58:
						outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
						inClass = 'pt-page-rotateCubeLeftIn';
						break;
					case 59:
						outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
						inClass = 'pt-page-rotateCubeRightIn';
						break;
					case 60:
						outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
						inClass = 'pt-page-rotateCubeTopIn';
						break;
					case 61:
						outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
						inClass = 'pt-page-rotateCubeBottomIn';
						break;
					case 62:
						outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
						inClass = 'pt-page-rotateCarouselLeftIn';
						break;
					case 63:
						outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
						inClass = 'pt-page-rotateCarouselRightIn';
						break;
					case 64:
						outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
						inClass = 'pt-page-rotateCarouselTopIn';
						break;
					case 65:
						outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
						inClass = 'pt-page-rotateCarouselBottomIn';
						break;
					case 66:
						outClass = 'pt-page-rotateSidesOut';
						inClass = 'pt-page-rotateSidesIn pt-page-delay200';
						break;
					case 67:
						outClass = 'pt-page-rotateSlideOut';
						inClass = 'pt-page-rotateSlideIn';
						break;
					case 68:
						outClass = 'pt-page-fadeOut';
						inClass = 'pt-page-fadeIn';
						break;
					case 69:
						outClass = 'pt-page-blurOut';
						inClass = 'pt-page-blurIn';
						break; 	
				}

				$currPage.addClass( outClass ).on( params.animEndEventName, function() {
					$currPage.off( params.animEndEventName );
					_this.set('endCurrPage',true);
					if( params.endNextPage ) {
						_this.onEndAnimation( $currPage, $nextPage );
					}
				} );

				$nextPage.addClass( inClass ).on( params.animEndEventName, function() {
					$nextPage.off( params.animEndEventName );
					 _this.set('endNextPage',true);
					if( params.endCurrPage ) {
						_this.onEndAnimation( $currPage, $nextPage );
					}
				} );

				if( !params.support ) {
					this.onEndAnimation( $currPage, $nextPage );
				}
				this.onStartAnimation();

			},
	       // nextPage over
	        onStartAnimation: function(){
	        	if(this.params.onAnimateStart){
		           	this.params.onAnimateStart();       
	        	} 
			    if(this.params.tips){
			        this.tipsChange();
			    }
                
	        },
 	        onEndAnimation: function( $outpage, $inpage ) {
 	        	this.set('endCurrPage',false);
 	        	this.set('endNextPage',false);
				this.resetPage( $outpage, $inpage );
 	        	this.set('isAnimating',false);
			    if(this.params.onAnimateEnd){
		           	this.params.onAnimateEnd();
			    }
	        },

	       resetPage : function( $outpage, $inpage ) {;
		      $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		      $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	       }           

   };
   // prototype over
    window.Wfullpage = window.Wfullpage || Wfullpage;
    
    

})(window,jQuery);