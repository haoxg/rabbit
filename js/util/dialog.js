window.alertDia=(function($){
    var alertInnerDiv="opacity:1; visibility: hidden; position:absolute; width:75.467%;left:50%; margin-left:-37.7335%;top:50%;text-align:center;font-size:0.3rem; background:white;color:#333;border-radius:.1rem; z-index: 1300;";
    var frameBtn="float:left; width:49.8%;color:#666;border-top:1px #e2e2e2 solid;border-radius:0 0 .1rem .1rem;font-size:0.28rem;";
    var rightBtn='border-radius:0 0 .1rem 0; color:#ff7600;';
    var leftBtn='border-right:1px #e2e2e2 solid;border-radius:0 0 0 .1rem;';
    var alertTitle="display:none;width:100%;height:1.1rem;line-height:1.25rem;margin:0;font-size:0.32rem;color:#333333;text-align:center; background:white;border-radius:.1rem .1rem 0 0; overflow:hidden; margin-bottom: -0.53rem;";
    var frameBody="padding:0.5rem .5rem .45rem;line-height:0.4rem;font-size:0.3rem;color:#333333; text-algin:center; border:none;";
    var alertDiv="visibility:hidden;position:fixed;left:0px;bottom:0px;width:100%;height:100%;min-height:100%;z-index:3147483647;background:rgba(0,0,0,0.6);";
    var bold="font-weight:bold;";
    var html = "" ;
    
	function init(){
        if(androidOrIphone()){
            bold="";
        }
	    html = "" ;
        html +='<div id="alertDiv" style="'+alertDiv+'" class="alertDiv" >';
        html += '<div id="alertInnerDiv" style="'+alertInnerDiv+'" class="alertInnerDiv"><div class="frameHead" style="height:auto;"  >' ;
		html += '<h1 id="alertTitle" style="'+alertTitle+bold+'" ></h1>' ;
		html += '</div><div style="'+frameBody+'" class="frameBody">' ;
		html += '<div id="alertContent"  class="frameMain_"></div>' ;
		html += '</div>' ;
		html += '<div id="alertConfirm" style="width:100%;height:0.78rem;line-height:0.78rem;" class="frameFoot">' ;
		html += '<a id="alertSingle" style="'+frameBtn+rightBtn+bold+'" class="frameBtn rightBtn">确定</a>' ;
		html += '</div>' ;
		html += '</div>' ;
        html += '</div>';
		$("body").append(html);
        
	}
    function androidOrIphone(){
        var system = window.navigator.userAgent.toLowerCase() ;
        if(system.indexOf("iphone")>=0 || system.indexOf("ipad")>=0 || system.indexOf("mac")>=0){
            return false ;
        }
        return true ;
    }
    init() ;
	//弹框调用方法
    var json={};
	return function(obj){
	        if(typeof obj == "object"){
                json.title = obj.title||"";  //头部
                json.content = obj.content||"";// 提示内容
                json.preventClick= obj.preventClick||"";// 点击弹框外区域是否关闭弹框，false不关闭，true关闭
                json.leftText = obj.leftText||"取消";  //左边按钮文案
                json.leftEvent = obj.leftEvent;  //左边按事件回调
                json.rightText = obj.rightText||"确定"; //右边按钮文案
                json.rightEvent = obj.rightEvent; //右边按钮事件回调
                json.confirmText = obj.confirmText||""; //一个按钮时，自定义按钮文案
                json.fnback = obj.fnback; //一个按钮时，自定义按钮事件
                json.leftCss = obj.leftCss||""; //左边按钮css样式
                json.rightCss = obj.rightCss||""; //右边按钮css样式
                json.confirmCss = obj.confirmCss||""; //一个按钮时，自定义按钮样式
                json.alertContentCss = obj.contentCss||""; //中间弹框提示内容的样式
                if(json.title){
                    $("#alertTitle").html(json.title).show();
                }else{
                    $("#alertTitle").html("").hide();
                }
                if(json.content){
                    $("#alertContent").html(json.content).attr("style",json.alertContentCss);
                }else{
                    $("#alertContent").html("");
                }
            }else if(typeof obj=='string'){
                $("#alertTitle").html("").hide();
                $("#alertContent").html(obj)
            }
            if(json.preventClick!=""){
                //点击弹框以外的区域，消除弹框

                $(document).off("touchend",'#alertDiv').on("touchend","#alertDiv",function(e){

                    if($(e.target).attr("id")=='alertDiv'){
                        $(e.currentTarget).css("visibility","hidden");
                        $(".alertInnerDiv").css("visibility","hidden");
                    }

                });
            }
            if(json.leftEvent || json.rightEvent){//弹框下面有两个选择按钮

                var html = '<a id="alertLeft"  style="'+frameBtn+leftBtn+bold+json.leftCss+'"  class="frameBtn leftBtn">'+json.leftText+'</a>' ;
                    html += '<a id="alertRight"  style="'+frameBtn+rightBtn+bold+json.rightCss+'" class="frameBtn rightBtn">'+json.rightText+'</a>' ;

                $("#alertConfirm").html(html) ;

                $("#alertDiv").off("click",'#alertLeft').on("click","#alertLeft",function(e){
                    e.stopPropagation();
                    $("#alertDiv").css("visibility","hidden");
                    $(".alertInnerDiv").css("visibility","hidden");
                    json.leftEvent && json.leftEvent();
                });

                $("#alertDiv").off("click",'#alertRight').on("click","#alertRight",function(e){
                    e.stopPropagation();
                    $("#alertDiv").css("visibility","hidden");
                    $(".alertInnerDiv").css("visibility","hidden");
					json.rightEvent && json.rightEvent();
                });

            }else{
                //弹框下面一个选择按钮

                $("#alertConfirm").html('<a id="alertSingle" style="'+frameBtn+rightBtn+bold+(json.confirmCss||"")+'width:100%;color:#ff7600;" class="frameBtn rightBtn setWidth">'+(json.confirmText||"知道了")+'</a>') ;

                $("#alertDiv").off("click","#alertSingle").on("click","#alertSingle",function(){
                    if(json.fnback){
                        json.fnback() ;
                    }
                    $("#alertDiv").css("visibility","hidden");
                    $(".alertInnerDiv").css("visibility","hidden");

                })
            }
        $("#alertInnerDiv").css({
            '-webkit-transform':"translateY(-50%)",
            'transform':'translateY(-50%)'
        });
        $("#alertDiv").css("visibility","visible");
        $(".alertInnerDiv").css("visibility","visible");
	}
})((window.Zepto||window.jQuery)) ;