(function () {
  var util = new publicMethod();
	var root = new rootMethod();
  var userInfo = util.parse(util.getCookie("userInfo"));
  var productName = util.getUrlParam("productName")|| util.getCookie("productName");
  var gameTime = null; //参与哪天的玉兔游戏
  var gameId = null; //参与游戏的id,提交分数时要带上这个参数
  var gameNumber = 10; //可用游戏次数
  var game = null; 
  var hasExitTip = false; //是否弹有退出弹窗
  var isForced = false; //强制退出
  
  function init(){
    // 游戏初始化
    game = new Game(15);
    // 区分赢彩
    if(productName.indexOf('yc') >= 0){
      $('#different').attr('class','icon3');
    }
    util.sendToClient("寻找玉兔得千元");
    // 初始化游戏
    game.init();
    game.on('game.start', function () {
      // setTimeout(function(){
      //   $("#soundBg1")[0].play();//音乐起
      // },1000)
    });
    game.on('game.over', function (event) {
      // 是否强制退出
      if(!isForced){
        if(!hasExitTip){
          $('.alert').addClass('show');
        }
        submitGame();
      }
      isForced = false;
      $('#gameCount').text(game.score); //game.count
      $('#gameScore').text(game.score);
      $('#againStart').addClass(gameNumber>0?'r1':'r0');
      game.score = 0;
      game.count = 0;
    });
    game.on('game.score',function(event){
      $('.game-score span').text(Number($('.game-score span').text()) + event.score);
    });
    // 关闭弹窗
    $('#alertCancel').on('click',function(){
      $('.alert').removeClass('show');
      $('.operation-panel').removeClass('hide');
      $('#start-game').attr('class','').addClass('s'+ gameNumber);
      $('.tuzi').removeClass('hide');
      $('.game-countdown').removeClass('show');
    });
    // 开启游戏
    window.start = function (again) {
      if(gameNumber > 0){
        if(again){
          joinGame();
          return;
        }
        if(true){
          joinGame();
        }else{
          alertDia({
            "title": "玩法提示",
            "content": "在15s内点击屏幕中出现的玉兔，寻找的玉兔越多，<br>越有机会赢千元奖励！<br>（请确保寻兔时网络状况良好）",
            "leftText": '暂不',
            'rightText': '寻找玉兔',
            "rightEvent": joinGame,
          });
          util.setCookie('hasYuTuTip',userInfo.userNo,true);
        }
      }else{
        return;
      }
    }
    // 再来一次
    $("#againStart").on('click',function(){
      if(gameNumber > 0){
        $('.alert').removeClass('show');
        start(true); //重启
      }else{
        window.location.href = 'qmcai://usercenter';
      }
    });
    // 获取游戏数据
    // getGameInfo();
  }
  // 开始游戏
  function startGame(){
    gameNumber--;
    $('.operation-panel').addClass('hide');
    $('#start-game').addClass('hide');
    $('.tuzi').addClass('hide');
    $('.game-rank').addClass('hide');
    game.$gameCountdown = $('.game-countdown').addClass('show').find('time').text(game.duration+'s');
    // 开启游戏
    setTimeout(function () {
      game.start();
    }, 1000);
  };
  
  // 加入游戏
  function joinGame(){
    $('#soundBg1')[0].pause();
    $('#soundBg2')[0].play();
    // var json = {
    //   command: 'joinYuTuActivity',
    //   userNo: 1,
    //   accessToken: userInfo.accessToken,
    //   gameTime: gameTime
    // }
    // root.getDataByAjax(json,function(res){
    //   if(res.errorCode == '0000'){
    //     gameId = res.data.gameId;
    //     startGame();
    //   }else{
    //     util.blackTs(res.message);
    //     gameNumber = 0;
    //     $('#alertCancel').trigger('click');
    //   }
    // });
    startGame();
  }
  // 提交游戏获得分
  function submitGame(){
    var json = {
      command: 'sumbitYuTuActivity',
      userNo: userInfo.userNo,
      accessToken: userInfo.accessToken,
      pkgName: "com.quanmincai.caipiao",
      gameTime: gameTime,
      gameId: gameId,
      score: game.score
    }
    root.getDataByAjax(json,function(){});
  }
  
  // 获取后台退出事件
  function appSetJs(param){
    param = JSON.parse(param);
    if(param.type != 2 && game.status == 1){ //页面进入后台并且游戏开始状态
      game.backstage = true;
      $('#soundBg2')[0].pause();
      $('#soundBg1')[0].pause();
    }else if(param.type != 2 && game.status == 0){ //页面进入后台并且游戏未开始状态
      game.backstage = true;
      $('#soundBg1')[0].pause();
      $('#soundBg2')[0].pause();
    }else if(param.type == 2 && game.status == 1){ //页面进入前台并且游戏开始状态
      game.backstage = false;
      $('#soundBg2')[0].play();
    }else if(param.type == 2 && game.status == 0){ //页面进入前台并且游戏未开始状态
      game.backstage = false;
      $('#soundBg1')[0].play();
      // 进入前台后，如果没有userInfo会尝试重新请求一次；
      setTimeout(function(){
        if(!userInfo){
          userInfo = util.parse(util.getCookie("userInfo"));
          // getGameInfo();
        }
      },1000);
    }
  }
  window.appSetJs = appSetJs;
  //返回逻辑
  function headBack(){
    if(game.status == 1){
      hasExitTip = true;
      alertDia({
        title: '提示',
        content: '您真的要离开吗？离开后，您本次机会将扣除！',
        leftText: '无情离开',
        rightText: '回到游戏',
        leftEvent: function(){
          isForced = true;
          hasExitTip = false;
          $('#alertCancel').trigger('click');
          game.stop();
        },
        rightEvent: function(){
          hasExitTip = false; 
          if(game.status == 0){
            $('.alert').addClass('show');
          }
        }
      })
    }else{
      window.location.href="qmcai://quit?mainClient=true" ;
    }
  }
  window.headBack = headBack ;

  init();
 
})();
