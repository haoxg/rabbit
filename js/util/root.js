(function($){
	var util = new publicMethod() ;
	var rootMethod = function(){} ;
	
	if(util.getUrlParam("channel") != ""){
		util.setCookie("channel",util.getUrlParam("channel"),60*24) ;
	}
	if(util.getUrlParam("imei") != ""){
		util.setCookie("imei",util.getUrlParam("imei"),60*24) ;
	}
	var productName = util.getUrlParam("productName") ;
	if(productName != "") {
		util.setCookie("productName",productName,60*24*30) ;
	} else {
		productName = util.getCookie("productName") ;
	}
	if(util.getUrlParam("version") != ""){
		util.setCookie("version",util.getUrlParam("version"),60*24) ;
	}
	var version = util.getCookie("version") ;

	var platform = 'html';

	var host = window.location.host ;
	var url = "http://192.168.1.11/support/bdapi/activity/yutu/games";
	var url_mai = 'http://192.168.1.11';

	if(productName.indexOf("yc") >= 0) {
		if(host.indexOf("30.11")<0 && host != "" && host.indexOf(":") <= 0){
			url = 'https://m.lechuangmingcai.com/support/bdapi/activity/yutu/games/';
			url_mai = 'https://m.lechuangmingcai.com/';
		}else{
			url = "http://192.168.30.11/support/bdapi/activity/yutu/games";
			url_mai = 'http://192.168.30.11';
		}
	} else {
		if(host.indexOf("1.11")<0 && host != "" && host.indexOf(":") <= 0){
			url = document.location.protocol + "//" + window.location.host + '/support/bdapi/activity/yutu/games/';
			url_mai = 'https://m.leader001.cn/'
		}
	}

	rootMethod.prototype = {
		url:url,
		//js请求
		getDataByAjax:function(param,quizlist){
			var command = param.command;
			param.platform = platform;
			param.version = version;
			param.productName = productName;
			param = JSON.stringify(param) ;
			$(".loadDiv").show();
			var accesstokenurl= this.url+"/"+command+"?parameter="+param;
			$.ajax({
				type:"GET",
				async:true,
				timeout:30000,
				url :accesstokenurl,
				dataType:"jsonp",
			    jsonp:"callback",
				beforeSend: function (XMLHttpRequest) {
					// 禁用按钮防止重复提交
				},
				success:function(result){
					$(".loadDiv").hide();
					quizlist(result);
				},
				error:function(){
					$(".loadDiv").hide();
					var r = {"errorCode":"0047","message":"当前网络较慢,请稍后再试"} ;
					quizlist(r);
				},
				//complete:function(XMLHttpRequest,status){
                //
				//	$(".load_img").hide();
				//	//请求完成后最终执行参数
				//	if(status=='abort'||status=='timeout'){//超时,status还有success,error等值的情况
				//		console.log("complete");
				//		var r = {"errorCode":"0047","message":"当前网络状态不佳，请稍后再试。"};
				//		quizlist(r);
				//	}
				//}
			});
		},
		addOneClick:function(param){
			param.platform = platform ;
			param.version = version ;
			param.productName = productName ;
			param.h5HttpRequest = 'true';
			param = JSON.stringify(param) ;
			param = encodeURI(param) ;
			var accesstokenurl= url_mai + '/support/bdapi/datapoint/logh5act?parameter='+param;
			$.ajax({
				type:"GET",
				async:true,
				url :accesstokenurl,
				dataType:"jsonp",
			    jsonp:"callback",
			    success:function(result){
			    },
				error:function(){ 
			    }
			});
		}
	}
	window.rootMethod = rootMethod ;

	function clientBack(){
		headBack() ;
	}
	window.clientBack = clientBack ;
})(jQuery) ;