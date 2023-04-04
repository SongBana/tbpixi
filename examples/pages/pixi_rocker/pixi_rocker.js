import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
require("dmpixi/lib/pixi-plugins/pixi-spine/pixi-spine");
// const SpineBoyJSON = require("../../demos/dragon-ess.json");
import TWEEN, { Tween } from "@tweenjs/tween.js";
const dmThrottle = (func, gapTime = 1000) => {
  let _lastTime = null;
  return function () {
    const { globalData } = getApp();
    let _nowTime = +new Date();
    const that = this;
    if (_nowTime - _lastTime > gapTime || !_lastTime) {

      func.apply(that, arguments); //将this和参数传给原函数

      _lastTime = _nowTime;
    }
  };
};

Page({
  canvas: null,
  context: null,
  // pixi Application
  pixiApplication: null,
  pixiOptions: null,
  ball: null,
  lastAtitude: {
    x: 0,
    y: 0
  },
  data: {
    appOptions: {
      // 手动指定application的尺寸
      // width: 750,
      // height: 12500,
      // 全屏-以窗口宽高作为application的尺寸，当设置此选项后，手动设置的width\height会失效
      isFullScreen: true,
      // application是否背景透明
      // transparent: true,
      // 背景颜色
      backgroundColor: 0x1099bb,
      // 是否强制用2d上下文渲染，如果为false,则优先使用webgl渲染
      forceCanvas: false
    },
  },
  onLoad(query) {
    console.log('page onLoad', query)
    const that = this
    my.onAccelerometerChange((res) => {
      that.handleOrientation(res)
    });
  },
  onShow() { },
  onTouchHandle(e) {
    //my.emit('onWindowTouch',e)
  },
  onPixiCanvasError(e) {
    console.log(e);
  },
  onPixiCanvasDidUnmount(e) {
    console.log('aaa', e);
    this.canvas = null;
    this.context = null;
    this.pixiApplication = null;
  },
  onAppInit(e) {
    const that = this
    const { canvas, context, options, application } = e
    console.log('onAppInit', e);
    this.canvas = canvas;
    this.context = context;
    this.pixiApplication = application;
    this.pixiOptions = options;
    const { stage, loader } = application;
    console.log("对象", application)
    console.log("舞台", application.stage)
    console.log("画布宽高", application.renderer.screen.width, application.renderer.screen.height)

    stage.interactive = true; //开启点击事件

    // 创建小球
    this.ball = new PIXI.Graphics();
    this.ball.beginFill(0xff0000);
    this.ball.drawCircle(0, 0, 20);
    this.ball.endFill();
    this.ball.vx = 0
    this.ball.vy = 0
    this.ball.speed = 1
    this.ball.x = application.renderer.screen.width / 2;
    this.ball.y = application.renderer.screen.height / 2;

    // 添加小球到场景
    stage.addChild(this.ball);


    const screenWdith = application.renderer.screen.width
    const screenheight = application.renderer.screen.height
    application.ticker.add(() => {
      that.ball.x += Number(that.ball.vx) * Number(that.ball.speed);
      that.ball.y += Number(that.ball.vy) * Number(that.ball.speed);
      if (that.ball.x < 0) {
        that.ball.x = 0;
      } else if (that.ball.x > screenWdith - 10) {
        that.ball.x = screenWdith - 10;
      }

      if (that.ball.y < 0) {
        that.ball.y = 0;
      } else if (that.ball.y > screenheight - 10) {
        that.ball.y = screenheight - 10;
      }
    })

  },
  // handleOrientation: dmThrottle(function (event) {
  //   this.handleOrientationAsync(event)
  // }, 300),
  // 处理陀螺仪事件
  handleOrientation(event) {
    // return
    if (!this.ball) return
    // 计算小球的速度
    var x = (event.x * 180).toFixed(2)
    var y = -(event.y * 180).toFixed(2)
    this.ball.vx = Number(x);
    this.ball.vy = Number(y);

  }
})