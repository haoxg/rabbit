(function(){

	var publicMethod = function(){} ;
	var flag = true ;
	var blackId ;
	
	publicMethod.prototype = {
		//需要隐藏客户端下载链接的渠道
		hideClientLoad:"6006,6100" ,
		
		//获取渠道号
		getCooperateChannel:function(){
			var cooperateChannel = this.getUrlParam("cooperateChannel") ;
			if(cooperateChannel == ""){
				cooperateChannel = this.getCookie("cooperateChannel") ;
			}
			
			return cooperateChannel ;
		},
		
		//删除数组指定值
		removeValue:function(arr,value){
			if(arr.length > 0 ){
				var newarr = [] ;
				for(var i=0;i<arr.length;i++){
					if(arr[i] == value){

					}else{
						newarr[newarr.length] = arr[i] ;
					}
				}

				return newarr ;
			}

			return arr ;
		},

		//判断是否含有某class
		hasClass:function(obj,newName){
			if(!obj){
				return false ;
			}
			
			var oldName = obj.className ;
			if(oldName.length == 0){ 
				return false ;
			}
			
			if(oldName==newName || oldName.match(new RegExp("(^|\\s)" + newName + "(\\s|$)"))){
				return true ;
			}

			return false ;
		},

		//添加class
		addClass:function(obj,newName){
			if(!obj){
				return  ;
			}
			
			var oldName = obj.className ;
			if(oldName.length == 0){
				obj.className = newName ;
				return ;
			}
			
			if(oldName==newName || oldName.match(new RegExp("(^|\\s)" + newName + "(\\s|$)"))){
				return ;
			}
			obj.className = oldName + " " + newName; 
		},
		
		//删除class
		removeClass:function(obj,newName){
			if(!obj){
				return  ;
			}
			
			var oldName = obj.className ;
			if(oldName.length == 0){
				return ;
			}
			
			if(oldName==newName || oldName.match(new RegExp("(^|\\s)" + newName + "(\\s|$)"))){
				obj.className = oldName.replace((new RegExp("(^|\\s)" + newName + "(\\s|$)"))," ") ;
				return ;
			}
		},

		//组合算法
		zuHe:function(n,m){
			var up = 1 ;
			var down = 1 ;
			for(var i=n;i>(n-m);i--){
				up *= i ;
			}
			for(var i=1;i<=m;i++){
				down *= i ;
			}
			
			return up/down ;
		},

		//显示的注码排序
		sortNumber:function(a,b){
			return a - b ;
		},

		//存放cookie变量
		setCookie:function(name,value,minutes,path,domain,secure){
			if(window.sessionStorage){
				sessionStorage.setItem(name,value) ;
				
				if(minutes == undefined){
					return ;
				}
			}
				
			if(minutes == undefined){
				minutes = 30 ;
			}
			if(path == undefined){
				path = "/" ;
			}
			value = encodeURIComponent(value);
	        var cdata = name + "=" + value ;

	        var d = new Date();
	        if(minutes > 0){
	            d.setMinutes(d.getMinutes() + minutes) ;
	            cdata += "; expires=" + d.toGMTString();
	        }else if(minutes < 0){
	            d.setTime(d.getTime()-1000);
	            cdata += "; expires=" + d.toGMTString();
	        }
	        cdata +=path ? ("; path=" + path) : "" ;
	        cdata +=domain ? ("; domain=" + domain) : "" ;
	        cdata +=secure ? ("; secure=" + secure) : "" ;

	        document.cookie = cdata;
	    },

        /**
		 * 获取Cookie
		 * @param name
		 * @returns {*}
         */
    	getCookie:function(name){
    		var value ;
    		
    		if(window.sessionStorage){
    			value = sessionStorage.getItem(name);
    		}
    		if(value && value!=""){
    			return value ;
    		}
			var cookieName = encodeURIComponent(name) + "=",
				cookieStart = document.cookie.indexOf(cookieName);
			if (cookieStart > -1) {
				var cookieEnd = document.cookie.indexOf (";", cookieStart);
				if (cookieEnd == -1) {
					cookieEnd = document.cookie.length;
				}
				value = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
			}
			if(!value){
				value = '';
				}
			return value;
	    },

	    //删除cookie变量
		removeCookie:function(name){
			if(window.sessionStorage){
				sessionStorage.removeItem(name) ;
			}

    		this.setCookie(name,"",-1) ;
		},

	    //将json字符串转换成json对象
	    parse:function(data){
	    	if(data == ""){
				return (new Function("return null"))();
			}else{
				return (new Function("return (" + data + ")"))();
			}
	    },

	    /*
	     * 获取随机数字
	     * num:球的个数
	     * minNum:最小号码 
	     * maxNum:最大号码
	     * */
	    getRandom:function(num,minNum,maxNum){
	    	if(flag){
	    		flag = false ;

	    		var arr = [] ;
				var curNum;
				do{
					curNum = Math.floor(Math.random()*maxNum) + minNum;	
					if(!searchArr(arr,curNum)){
						if(curNum<=maxNum && curNum>=minNum){
							arr.push(curNum);	
						}
					}
				}while(arr.length<num)
				flag = true ;

				return arr;
	    	}
		},

		//小于10的数字前面加0
		getZero:function(num){
			if(Number(num) < 10){
				return "0"+Number(num) ;
			}
			return  num ;
		},

		//将一个数组中小于10的元素，前面加0
		arrAddZero:function(arr){
			var newarr = [] ;
			for(var i=0;i<arr.length;i++){
				if(arr[i] < 10){
					newarr[i] = "0"+arr[i] ;
				}else{
					newarr[i] = arr[i] ;
				}	
			}

			return newarr ;
		},

		/**
		 * 获取网址后面的参数
		 * @param name
         * @returns {*}
         */
		getUrlParam:function (name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  decodeURIComponent(r[2]);
			return "";
		},
		//判断此彩种是否已经上线
		ifLining:function(lotno){
			var liningLotno = "1001" ;//双色球
			liningLotno += ",2001" ;//大乐透
			liningLotno += ",2007" ;//山东十一选5
			liningLotno += ",2006" ;//江西十一选5
			liningLotno += ",2801" ;//新疆十一选5
			liningLotno += ",2802" ;//开心十一选5
			liningLotno += ",2009" ;//快乐扑克
			liningLotno += ",1009" ;//新快三
			liningLotno += ",1007" ;//重庆时时彩
			liningLotno += ",1804" ;//重庆快乐十分
			liningLotno += ",3006,3007,3008,3009,3010,3011" ;//竞彩足球
			liningLotno += ",3001,3002,3003,3004,3005" ;//竞彩篮球
			liningLotno += ",4002" ;//任选九
			liningLotno += ",4001" ;//胜负彩
			liningLotno += ",1008" ;//安徽快三
			liningLotno += ",1002" ;//福彩3D		
			liningLotno += ",2002" ;//排列三
			liningLotno += ",2003" ;//排列五
			liningLotno += ",1003" ;//七乐彩
			liningLotno += ",2004" ;//七星彩
		
			if(liningLotno.indexOf(lotno) >= 0){
				return true ;
			}

			return false ;
		},

		//根据lotno获取彩种名称
		getLotnoName:function(lotno){
			if(lotno == "1001"){
				return "双色球" ;
			}else if(lotno == "1002"){
				return "福彩3D" ;
			}else if(lotno == "1003"){
				return "七乐彩" ;
			}else if(lotno == "1804"){
				return "快乐十分" ;
			}else if(lotno == "1008"){
				return "快三" ;
			}else if(lotno == "1009"){
				return "新快三" ;
			}else if(lotno == "2001"){
				return "大乐透" ;
			}else if(lotno == "2002"){
				return "排列三" ;
			}else if(lotno == "2003"){
				return "排列五" ;
			}else if(lotno == "2004"){
				return "七星彩" ;
			}else if(lotno == "2006"){
				return "新11选5" ;
			}else if(lotno == "2007"){
				return "老11选5" ;
			}else if(lotno == "2801"){
				return "夜场11选5" ;
			}else if(lotno == "2800"){
				return "上海11选5" ;
			}else if(lotno == "2802"){
				return "开心11选5" ;
			}else if(lotno == "2803"){
				return "幸运11选5" ;
			}else if(lotno == "2009"){
				return "快乐扑克" ;
			}else if(lotno == "jczq"){
				return "竞彩足球" ;
			}else if(lotno == "3006"){
				return "竞足让球" ;
			}else if(lotno == "3010"){
				return "竞足胜平负" ;
			}else if(lotno == "3007"){
				return "竞足比分" ;
			}else if(lotno == "3008"){
				return "竞足总进球" ;
			}else if(lotno == "3009"){
				return "竞足半全场" ;
			}else if(lotno == "3011"){
				return "竞足混合" ;
			}else if(lotno == "1007"){
				return "重庆时时彩" ;
			}else if(lotno == "4002"){
				return "足彩任选九场" ;
			}else if(lotno == "4001"){
				return "足彩十四场" ;
			}else if(lotno == "3001"){
				return "竞篮胜负" ;
			}else if(lotno == "3002"){
				return "竞篮让分" ;
			}else if(lotno == "3003"){
				return "竞篮胜分差" ;
			}else if(lotno == "3004"){
				return "竞篮大小分" ;
			}else if(lotno == "3005"){
				return "竞篮混合" ;
			}else{
				return "" ;
			}
		},

		//判断是否是竞彩足球
		ifJczq:function(lotno){
			if(lotno=="3006"||lotno=="3007"||lotno=="3008"||lotno=="3009"||lotno=="3010"||lotno=="3011"){
				return true ;
			}

			return false ;
		},

		//判断是否是竞彩篮球
		ifJclq:function(lotno){
			if(lotno=="3001"||lotno=="3002"||lotno=="3003"||lotno=="3004"||lotno=="3005"){
				return true ;
			}

			return false ;
		},

		//替换所有
		replaceAll:function(str,code,newcode){
			while(str.indexOf(code) > 0){
				str = str.replace(code,newcode) ;
			}
			return str ;
		},

		//获取快乐扑克中的花色
		getHuase:function(type){
			if(type == "1"){
				return "ht" ;
			}else if(type == "2"){
				return "hongt" ;
			}else if(type == "3"){
				return "mh" ;
			}else if(type == "4"){
				return "fk" ;
			}

			return "ht" ;
		},

		//获取快乐扑克中的AJQK
		getAJQK:function(code){
			if(code == "01"){
				code = "A" ;
			}else if(code == "11"){
				code = "J" ;
			}else if(code == "12"){
				code = "Q" ;
			}else if(code == "13"){
				code = "K" ;
			}else{
				code = Number(code) ;
			}

			return code ;
		},
	
		//判断访问的设备是手机，还是电脑
		ifPhoneVisit:function(){
			
			//此法在Android手机上不好使
			/*var system = window.navigator.platform ;
			var json ={};
  
    		json.win = system.indexOf("Win")==0 ;     
    		json.mac = system.indexOf("Mac")==0 ;     
    		json.x11 = system=="X11" ;
    		json.Linux = system.indexOf("Linux")==0 ;    

		    if(json.win || json.mac || json.xll || json.Linux){  
		  		return false ;
		    }

			return true ;*/
			
			//此法暂时未发现问题
			var sUserAgent = navigator.userAgent.toLowerCase();
	        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	        var bIsAndroid = sUserAgent.match(/android/i) == "android";
	        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	            return true ;
	        } else {
	             return false ;
	        }
		} ,
		
		/*判断浏览器类型*/
		judgeBrowser:function(){
			//var dd = rsflist
		} ,

		//判断是否登录
		isLogin:function(){
			if(this.getCookie("userInfo")){
				return true ;
			}

			return false ;
		},

		//获取json对象的长度
		getJsonLen:function(json){
			var len = 0 ;
			if(json){
				for(var value in json){
					len += 1 ;
				}
			}

			return len ;
		},

		//数组降序排序
		desc:function(x,y){
			if(x > y){
				return -1 ;
			}else{
				return 1 ;
			}
		},

		//数组升序排序
		asc:function(x,y){
			if(x > y){
				return 1 ;
			}else{
				return -1 ;
			}
		},

		//限制input输入框只能输入数字或字母
		limitNumAndLetter:function(id){
			var name = $(id).value ;
			var reg = /^[0-9]|[a-z]|[A-Z]$/ ;

			for(var i=0;i<name.length;i++){
				if(!reg.test(name.slice(i,i+1))){
					$(id).value = name.slice(0,i) ;
					break ;
				}
			}	
		},

		//限制input输入框只能输入数字
		limitNum:function(id){
			var name = $(id).value.trim() ;
			var reg = /^[0-9]$/ ;

			if(name != ""){
				for(var i=0;i<name.length;i++){
					if(!reg.test(name.slice(i,i+1))){
						$(id).value = name.slice(0,i) ;
						break ;
					}
				}
			}	
		},

		//判断对象是否为空
		objIsEmpty:function(obj){
			for(var name in obj){
				return true ;
			}

			return false ;
		},

		//将一个字符串数组，转变成一个数字数组
		changeStrToArr:function(arr){
			var newarr = [] ;
			for(var i=0;i<arr.length;i++){
				newarr[i] = Number(arr[i]) ;
			}

			return newarr;
		},

		//当内容过多时，根据页面的宽度进行自动换行
		getSwitchCode:function(num,code){
			var spanEle = document.createElement("span") ;
			spanEle.id = "textLen" ;
			document.getElementsByTagName("body")[0].appendChild(spanEle) ;

			$("textLen").innerHTML = code ;
			var len = $("textLen").offsetWidth ;
			$("textLen").innerHTML = "" ;

			var lenn = document.body.scrollWidth*num/100 ;
			var len3 = Math.floor(lenn/len*code.length) ;

			var num = code.length/len3 ;
			var newcode = "" ;
			for(var i=0;i<=num;i++){
				newcode += code.slice(i*len3,(i+1)*len3)+"<br>" ;
			}
			
			return newcode ;
		},

		//计算字符串的长度，汉字算两个，字母数字算一个
		getStrLength:function(val){
			var str = new String(val);  
		    var bytesCount = 0;  
		    for (var i = 0 ,n = str.length; i < n; i++) {  
		        var c = str.charCodeAt(i);  
		        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
		            bytesCount += 1;  
		        } else {  
		            bytesCount += 2;  
		        }  
		    }  
		    return bytesCount ;
		},

		//判断设备是Android还是iPhone
		androidOrIphone:function(){
			var system = window.navigator.userAgent.toLowerCase() ;
		    if(system.indexOf("iphone")>=0 || system.indexOf("ipad")>=0 || system.indexOf("mac")>=0){
		    	return false ;
		    }
			
			return true ;
		},

		/*andriod客户端下载*/
		androidLoad:function(){
			try{
				androidLoadC() ;
			}catch(e){
				window.open("https://dlcdn.qmcai.com/packages2/quanmincai.apk?clientDownload=true") ;
			}
		},
		/*ios客户端下载*/
		iosLoad:function(){
			try{
				iosLoadC() ;
			}catch(e){
				window.open("https://itunes.apple.com/cn/app/quan-min-cai-cai-piao/id945548410?clientDownload=true") ;
			}
		},

		//黑框提示
		blackTs:function(str){
			if($("#blackDiv").size()){
				$("#blackSpan").innerHTML = str ;
			}else{
				var blackDiv = document.createElement("div") ;

				blackDiv.id = "blackDiv" ;
				blackDiv.className = "blackts" ;
				blackDiv.style.position = "fixed" ;
				blackDiv.style.bottom = "30%" ;
				blackDiv.style.width = "100%" ;
				blackDiv.style.textAlign = "center" ;
				blackDiv.style.zIndex = "999999" ;

				var html = '<span id="blackSpan" style="background: black;color: white;' ;
				html += 'box-shadow: 0px 0px 4px 9px black;border-radius: 2px;font-size: 0.24rem;">' ;
				html += str+'</span>' ;
				blackDiv.innerHTML = html ;

				document.getElementsByTagName("body")[0].appendChild(blackDiv);
			}

			if(blackId && blackId!=""){
				clearTimeout(blackId) ;
			}
			blackId = setTimeout(function(){
				if($("#blackDiv").size()){
					document.getElementsByTagName("body")[0].removeChild($("#blackDiv").get(0));
				}
			},2000) ;
		},
		
		/*清楚渠道缓存信息*/
		clearChannel:function(channel){
			/*先锋支付*/
			if(channel == "6100"){
				this.removeCookie("cooperateChannel") ;
				this.removeCookie("ucPayUserId") ;
			}
		},
		//设置客户端头部标题
		getSome:function (param){
			var getparam = this.getUrlParam(param);
			if(getparam != ""){
				this.setCookie(param,getparam,60*24*30) ;
			}else{
				getparam = this.getCookie(param) ; 
			}
			return getparam ;
		},
		sendToClient:function(param){
			if(window.webCallLocal){//android
				webCallLocal.setData(JSON.stringify(param));
			}
			if(!this.androidOrIphone() && this.versionFun(this.getSome("version"),"4.1.0")!=1){//ios
				this.sendToClientIOS(param);
			}
		},
		sendToClientIOS:function(param){
			var iFrame,url;
			url = 'qmcaijs://autoweb?param='+encodeURI(JSON.stringify(param));
            iFrame = document.createElement("iframe");
            iFrame.setAttribute("src", url);
            iFrame.setAttribute("style", "display:none;");
            iFrame.setAttribute("height", "0px");
            iFrame.setAttribute("width", "0px");
            iFrame.setAttribute("frameBorder", "0");
            document.body.appendChild(iFrame);
            // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
            iFrame.parentNode.removeChild(iFrame);
            iFrame = null;
		},
		//版本号判断
		versionFun:function(nowVersion,biVersion){
			if(nowVersion == biVersion){
				return 2 ;
			}

			var a = nowVersion.split(".");
			var b = biVersion.split(".");

			for(var i=0,j=(a.length>b.length?a.length:b.length);i<j;i++){
				if(a[i] && b[i]){
					if(parseInt(a[i])>parseInt(b[i])){
	                	return 0;
					}else if(parseInt(a[i])<parseInt(b[i])){
						return 1;
					}
				}else if(!a[i]){
					return 1 ;
				}else{
					return 0 ;
				}
			}
		},
		uuid:function(){
			var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
			var uuid = [], i;
			var len = 32,radix = chars.length;
			 
			if (len) {
			   for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
			} else {
			   var r;
			 
			   uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			   uuid[14] = '4';
			 
			   for (i = 0; i < 36; i++) {
			    if (!uuid[i]) {
			     r = 0 | Math.random()*16;
			     uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			    }
			   }
			}
			 
			return uuid.join('');
		}
		
	};

	function searchArr(_arr,num){
		for(var i=0;i<_arr.length;i++){
			if(_arr[i] == num){
				return true;	
			}	
		}
		return false;
	}
	function clientBack(){
		headBack();
	}
	window.publicMethod = publicMethod ;
	window.clientBack=clientBack;
})() ;