(function (window) {
  // "use strict";
  // 事件设计模式对象
  function EventTarget(){
    this.handlers = {};
  }
  EventTarget.prototype = {
      constructor:EventTarget,
      on:function(type,handler){
          if(typeof this.handlers[type] === "undefined"){
              this.handlers[type] = [];
          }
          this.handlers[type].push(handler);
      },
      emit:function(event){
          if(!event.target){
              event.target = this;
          }
          if(this.handlers[event.type] instanceof Array){
              const handlers = this.handlers[event.type];
              handlers.forEach(function(handler){
                  handler(event);
              })
          }
      },
      off:function(type,handler){
          if(this.handlers[type] instanceof Array){
              const handlers = this.handlers[type];
              for(var i = 0,len = handlers.length; i < len; i++){
                  if(handlers[i] === handler){
                      break;
                  }
              }
              handlers.splice(i,1);
          }
      }
  }
  // 寄生组合继承函数
  function inheritPrototype(subType,superType){
    //object()方法是ES5前Object.create()的非规范化实现，后面会给出代码以及二者的比较
    var prototype=Object.create(superType.prototype);
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype; //指定对象  
  }
  // 全局dom对象
  var $Grassland = $("#gameZone");
  var $rabbitJade = $(".rabbit-hole.jade");
  var $rabbitGold = $(".rabbit-hole.gold");
  var bgMusic1 = $("#soundBg1")[0];
  var bgMusic2 = $("#soundBg2")[0];
  // 全局函数随机数
  function GetRandomNum(Min, Max, Num) {
    var range = Max - Min;
    var ary = [];
    for (var i = 0; i <= range; i++) {
      ary[i] = Min + i;
    }
    ary.sort(function () {
      return 0.5 - Math.random();
    });
    return ary.slice(0, Num);
  }

  /**
   * Rabbit
   *
   * @param {*} type 
   * @param {*} pos
   * @param {*} score
   * @param {*} speed
   */
  var Rabbit = function (type, pos, score, speed) {
    EventTarget.call(this);
    this.type = type || 1; //默认玉兔
    this.pos = pos;
    this.score = score;
    this.speed = speed;
  };
  inheritPrototype(Rabbit, EventTarget); //继承EventTarget事件设计模式（on,emit,off）
  Rabbit.prototype.showHole = function () {
      var $rabbitClone = $rabbitJade.clone().show();
      $rabbitClone.addClass("no" + this.pos).find('.block').addClass('flutter');
      $Grassland.append($rabbitClone);
  };
  Rabbit.prototype.hide = function () {
    // $Grassland.find(".rabbit-hole").find(".lift").animate({ height: "0%" }, 200);
    // $Grassland.find(".rabbit-hole").remove();
  };
  Rabbit.prototype.outHole = function () {
    var _this = this;
    if (this.type == 1) {
      var $rabbitClone = $rabbitJade.clone().show();
      $rabbitClone.find('.rabbit').append('<img src="img/tuzi' + this.pos + '.gif" />');
    } else {
      var $rabbitClone = $rabbitGold.clone().show();
      $rabbitClone.find('.rabbit').append('<img src="img/jintuzi' + this.pos + '.gif" />');
    }

    $rabbitClone.addClass("no" + this.pos);
    $rabbitClone.on("touchend", ".rabbit", function () {
      $rabbitClone.off("touchend");
      $(this)
        .siblings(".sound")[0]
        .play();
      $(this)
        .find(".score")
        .text("+" + _this.score)
        .addClass("show");
      // 暴露事件  
      _this.emit({ type: "rabbit.die" });
    });


    $Grassland.append($rabbitClone);
    var speed = (this.speed - 200) / 2;
    if (this.pos == 4) {
      $rabbitClone.find(".lift").height('0%');
      $rabbitClone
        .find(".rabbit")
        .css('padding-left','1rem')
        .animate({ 'padding-left': '0rem' }, speed)
        .animate({ 'padding-left': '0rem' }, 200)
        .animate({ 'padding-left': '1rem' }, speed);
    } else if (this.pos == 5) {
      $rabbitClone.find(".lift").height('0%');
      $rabbitClone
        .find(".rabbit")
        .css('padding-right','1.4rem')
        .animate({ 'padding-right': '0rem'}, speed)
        .animate({ 'padding-right': '0rem'}, 200)
        .animate({ 'padding-right': '1.4rem'}, speed);
    } else {
      $rabbitClone
        .find(".lift")
        .animate({ height: "0%" }, speed)
        .animate({ height: "0%" }, 200)
        .animate({ height: "100%" }, speed);
    }

    var time1 = setTimeout(function () {
      $rabbitClone.off("click");
      clearTimeout(time1);
    }, this.speed+100);
    var time2 = setTimeout(function () {
      $rabbitClone.remove();
      clearTimeout(time2);
    }, 2000);
  };
  /**
   * Game
   */
  var Game = function (duration) {
    EventTarget.call(this);
    this.backstage = false; // 游戏是否进入后台
    this.status = 0; //，0：游戏未开启，1：游戏中
    this.duration = duration || 15;
    this.score = 0; //游戏得分
    this.count = 0; //捕获玉兔数量
    this.gameTimer = null;
    this.seconds = 0;//秒数
    this.rules = [
      {
        rabbit: 1,
        rabbitGold: 0, 
        speed: 1000
      },{
        rabbit: 1,
        rabbitGold: 0,
        speed: 1000
      },{
        rabbit: 2,
        rabbitGold: 0,
        speed: 800
      },{
        rabbit: 2,
        rabbitGold: 0,
        speed: 800
      },{
        rabbit: 2,
        rabbitGold: 0,
        speed: 800
      },{
        rabbit: 2,
        rabbitGold: 0,
        speed: 800
      },{
        rabbit: 1,
        rabbitGold: 1,
        speed: 600
      },{
        rabbit: 1,
        rabbitGold: 1,
        speed: 600
      },{
        rabbit: 1,
        rabbitGold: 1,
        speed: 600
      },{
        rabbit: 1,
        rabbitGold: 1,
        speed: 600
      },{
        rabbit: 1,
        rabbitGold: 1,
        speed: 600
      },{
        rabbit: 2,
        rabbitGold: 1,
        speed: 500
      },{
        rabbit: 2,
        rabbitGold: 1,
        speed: 500
      },{
        rabbit: 2,
        rabbitGold: 1,
        speed: 500
      },{
        rabbit: 2,
        rabbitGold: 1,
        speed: 500
      }
    ];
  };
  inheritPrototype(Game, EventTarget); //继承EventTarget事件设计模式（on,emit,off）
  // 游戏开始
  Game.prototype.start = function () {
    var _this = this;
    this.ready(function () {
      // bgMusic1.pause(); 
      // bgMusic2.play();//音乐起
      _this.emit({ type: "game.start" });
      _this.renderRabbit();
      _this.gameTimer = setInterval(function(){
        _this.renderRabbit()
      }, 1000);
    });
  };
  // 游戏界面初始化
  Game.prototype.init = function (init) {
    // 渲染遮罩物
    new Rabbit(1,1).showHole();
    new Rabbit(1,2).showHole();
    new Rabbit(1,3).showHole();
    new Rabbit(1,4).showHole();
    new Rabbit(1,5).showHole();
    new Rabbit(1,6).showHole();
    //
    // bgMusic1.play();
    $('#app').one('touchstart',function(e){
      bgMusic1.play();
    });
　　$('#app').one('touchend',function(e){//start事件也不触发play
      bgMusic1.play();
    });
    $('#app').one('click',function(e){//start事件也不触发play
      bgMusic1.play();
    });
  };
  // 游戏准备倒计时 3>2>1>开始
  Game.prototype.ready = function (go) {
    var _this = this;
    _this.emit({ type: "game.ready" });
    _this.status = 1;
    $Grassland.find('.block').removeClass('flutter');
    var $ready = $('<div class="ready t3"><div class="countdown"></div></div>').prependTo("body");
    var readyCountdown = 3;
    var readyTimer = setInterval(function () {
      readyCountdown--;
      if (readyCountdown < 0) {
        clearTimeout(readyTimer);
        $ready.remove();
        // 开始游戏
        go();
      }
      $ready.removeClass('t' + (readyCountdown + 1));
      var time1 = setTimeout(function () {
        clearTimeout(time1);
        $ready.addClass('t' + readyCountdown);
      }, 100)
    }, 1000);
  };
  Game.prototype.renderRabbit = function(){
    var _this = this;
    _this.$gameCountdown.text((_this.duration - _this.seconds) + 's');
    _this.$gameCountdown.siblings('.progress').find('span').css('width', (100-_this.seconds/_this.duration* 100)  + '%');  
    if (_this.seconds < _this.duration) {
      var rabbit = 1;
      var rabbitGold = 1;
      var rabbits = _this.rules[_this.seconds].rabbit;
      var rabbitGolds = _this.rules[_this.seconds].rabbitGold;
      var speed = _this.rules[_this.seconds].speed;
      var Pos = GetRandomNum(1, 6, rabbits + rabbitGolds); //所有兔子位置
      var rabbitPos = Pos.slice(0, rabbits); //玉兔位置
      var rabbitGoldPos = Pos.slice(rabbits); //金兔位置
      // 刷玉兔
      while (rabbit <= rabbits) {
        var pos = rabbitPos[rabbit - 1];
        var score = 1; //玉兔分数
        var R = new Rabbit(1, pos, score, speed);
        R.outHole();
        R.on("rabbit.die", function (event) {
          _this.count++;
          _this.score += event.target.score;
          _this.emit({ type: "game.score",score:event.target.score});
        })
        rabbit++;
      }
      // 刷金兔
      while (rabbitGold <= rabbitGolds) {
        var pos = rabbitGoldPos[rabbitGold - 1];
        var score = GetRandomNum(2, 5, 1)[0]; //金兔分数
        var R = new Rabbit(2, pos, score, speed);
        R.outHole();
        R.on("rabbit.die", function (event) {
          _this.count++;
          _this.score += event.target.score;
          _this.emit({ type: "game.score",score:event.target.score});
        });
        rabbitGold++;
      }

      _this.seconds++;
    } else {
      _this.stop();
    }
  };
  Game.prototype.stop = function(){
    clearInterval(this.gameTimer);
    bgMusic2.pause();
    if(!this.backstage){
      bgMusic1.play();
    }
    this.seconds = 0;
    this.status = 0;
    $Grassland.find('.block').addClass('flutter');
    this.emit({ type: "game.over" });
  }

  window.Game = Game;

})(window);
