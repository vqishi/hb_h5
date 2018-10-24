(function ($) {
    $.weixinShare = function (options) {
        //var apiBaseUrl = "http://task.guguai.org/api/";
        var apiBaseUrl = apiPath;
        var localUrl = encodeURIComponent(window.location.href);
        // 统计访问/分享次数
        var defaults = {
            debug: false,
            title: "忘记写标题了！",
            desc: "忘记写内容了！",
            link: localUrl,
            imgUrl: "",
            nocount: false,
            success: function () {
            	
            },
            share_success:false,
            cancel: function () {
                // alert("用户取消分享!");
            }
        };


        // 参数合并
        var opts = $.extend(defaults, options);
        if(opts.nocount==true){

        }else{
            //访问
            //syncUpdateCount(opts.title,opts.desc, "Visit");
        }
        

        // 分享
		$.ajax({
			url:apiBaseUrl + "weixin/signature",
			data:{url:encodeURIComponent(window.location.href)},
			dataType:"xml",
			success:function(xml){
				if(xml){
					var json={
						nonceStr:$(xml).find("nonce").text(),
						signature:$(xml).find("signature").text(),
						appId:$(xml).find("appId").text(),
						timestamp:$(xml).find("timestamp").text()
					};
					wx.config({
						debug: false,
						appId: json.appId,
						timestamp: json.timestamp,
						nonceStr: json.nonceStr,
						signature: json.signature,
						jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage','showMenuItems','hideMenuItems','hideAllNonBaseMenuItem','hideOptionMenu','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','chooseImage','previewImage','uploadImage','downloadImage','translateVoice','openLocation','getLocation']
					});
					window.wxconfig = json;

					wx.ready(function () {
						// 分享给朋友

						wx.onMenuShareAppMessage(opts);
						// 分享到QQ
						wx.onMenuShareQQ(opts);

						// 分享到腾讯微博
						wx.onMenuShareWeibo(opts);

						// 分享到朋友圈
						//var title = opts.title;
						//opts.title = opts.desc;

						var optsx = $.extend({},opts);
						optsx.success = optsx.share_success||optsx.success;
						wx.onMenuShareTimeline(optsx);
					});
				}
			}
		})
    }
})(jQuery);
