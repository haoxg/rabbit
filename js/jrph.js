(function(){
	'use strict';
	var util = new publicMethod();
	var root = new rootMethod();
	var userInfo = util.parse(util.getCookie("userInfo")) ;
    var productName = util.getUrlParam("productName")|| util.getCookie("productName");
    var clientFlag = util.getUrlParam("clientLogin");

    var dayList = ['today','yesterday','beforeyesterday'];
    var currentDay = 0;

    function init (){   
        // 设置title
        util.sendToClient("寻找玉兔得千元");
        // 获取今日排行
        getJRPH();
    }
    // 获取今日排行
    function getJRPH(){
        var json = {
            command: 'queryYuTuRank',
            userNo: userInfo.userNo,
            accessToken: userInfo.accessToken
        }
        root.getDataByAjax(json,function(res){
            if(res.errorCode=="0000"){
                // 切换日期
                $('#todayDate').text(res.data.date[0]);
                $('#yesterdayDate').text(res.data.date[1]);
                $('#beforeyesterdayDate').text(res.data.date[2]);
                // 今天
                if(res.data.todayList.length != 0){
                    var table = createTable(res.data.todayList);
                    $('#today').show().append(table);
                }else{
                    $('#today').find('.default').show();
                }
                // 昨天
                if(res.data.yesterdayList.length != 0){
                    var table = createTable(res.data.yesterdayList);
                    $('#yesterday').append(table);
                }else{
                    $('#yesterday').find('.default').show();
                }
                // 前天 
                if(res.data.beforeyesterdayList.length != 0){
                    var table = createTable(res.data.beforeyesterdayList);
                    $('#beforeyesterday').append(table);
                }else{
                    $('#beforeyesterday').find('.default').show();
                }
                switchDay();
            }else{
                util.blackTs(res.errorCode+res.message);
            };
        })
    }
    function switchDay(){
        if(dayList[currentDay+1] && $('#todayDate').text() != '2018-09-21'&& $('#todayDate').text() != '2018-09-20'){
            $("#previous").show();
        }
        $("#previous").on('click',function(){
            $("#previous,#next").show();
            $(".today,.yesterday,.beforeyesterday").hide();
            if(dayList[currentDay+1]){
                currentDay++;
                console.log(dayList[currentDay]);
                $('.'+dayList[currentDay]).show();
                if(!dayList[currentDay+1] || $('#'+dayList[currentDay] + 'Date').text() == '2018-09-21'){
                    $(this).hide();
                }
            }
        })
        $("#next").on('click',function(){
            $("#previous,#next").show();
            $(".today,.yesterday,.beforeyesterday").hide();
            if(dayList[currentDay-1]){
                currentDay--
                console.log(dayList[currentDay]);
                $('.'+dayList[currentDay]).show();
                if(!dayList[currentDay-1]){
                    $(this).hide();
                }
            }
        })
    }
    function createTable(dataList){
        var table = '';
        table += '<table>'
        table += '<thead><tr><td>排名</td><td>用户名</td><td>参与时间</td><td>获得玉兔</td></tr></thead>';
        table += '<tbody>';
        for(var i=0; i<dataList.length; i++){
            table += '<tr class="'+ (dataList[i].userNo==userInfo.userNo?'me':'') +'">';
            table += '<td>'+ (dataList[i].rank<=3?'<img src="img/sub/medal'+ dataList[i].rank +'.png" class="medal" />':dataList[i].rank) +'</td>';
            table += '<td>'+ dataList[i].userName +'</td>';
            table += '<td>'+ formatTime(dataList[i].updateTime) +'</td>';
            table += '<td class="'+ (dataList[i].rank<=3?'text-red':'') + '">'+ dataList[i].totalScore +'</td>';
            table += '</tr>';
        }
        table += '</tbody>';
        table += '</table>';
        return table;
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
        // return y + "-" + addZero(m) + "-" + addZero(d) + " " + addZero(h) + ":" + addZero(mm);
        return addZero(m) + "-" + addZero(d) + " " + addZero(h) + ":" + addZero(mm) +":" + addZero(s);
    }
    
    //返回逻辑
    function headBack(){
       window.location.href="qmcai://quit?mainClient=true" ;
    }
    window.headBack = headBack ;

    init();
})();