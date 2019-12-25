(function(){
	'use strict';
	var util = new publicMethod();
	var root = new rootMethod();
	var userInfo = util.parse(util.getCookie("userInfo")) ;
    var productName = util.getUrlParam("productName")|| util.getCookie("productName");
    var clientFlag = util.getUrlParam("clientLogin");

    function init (){   
        // 设置title
        util.sendToClient("寻找玉兔得千元");
        // 获取我的记录
        getWDJL();
    }
    // 获取我的记录
    function getWDJL(){
        var json = {
            command: 'queryYuTuRecord',
            userNo: userInfo.userNo,
            accessToken: userInfo.accessToken
        }
        root.getDataByAjax(json,function(res){
            if(res.errorCode=="0000"){
                if(res.data.length != 0){
                    var table = '<table>'+
                    '<thead>'+
                    '<tr>'+
                    '<td class="half">参与时间</td>'+
                    '<td class="half">获得玉兔</td>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody>';
                    for(var i=0; i<res.data.length; i++){
                        table += '<tr><td>'+ formatTime(res.data[i].createTime) +'</td><td>'+ res.data[i].score +'</td></tr>' 
                    }
                    table +='</tbody></table>';
                    $('#dataList').show().append(table);
                }else{
                    $('.default').show();
                }
            }else{
                util.blackTs(res.errorCode+res.message);
            };
        })
    }
    //chart的时间展示
    function formatTime(timeStamp) {//2018-05-19 15:45
        var addZero = function(num) {
            return num < 10 ? "0" + num : num;
        }
        var time = new Date(timeStamp);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return addZero(m) + "-" + addZero(d) + " " + addZero(h) + ":" + addZero(mm) +":" + addZero(s);
    }
    
    //返回逻辑
    function headBack(){
       window.location.href="qmcai://quit?mainClient=true" ;
    }
    window.headBack = headBack ;

    init();
})();