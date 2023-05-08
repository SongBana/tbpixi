import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
import TWEEN from "@tweenjs/tween.js";
import Flower from "./flower";
require("dmpixi/lib/pixi-plugins/pixi-spine/pixi-spine");
Page({
  canvas: null,
  context: null,
  // pixi Application
  pixiApplication: null,
  pixiOptions: null,
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

    try {
      const flower = Flower.initFromImage("https://img.alicdn.com/imgextra/i3/1761495540/O1CN01TmxQyX1qnN2UDeKjI_!!1761495540-2-isvtu.png")
      flower.position(application.renderer.screen.width / 2, application.renderer.screen.height / 2)
      stage.addChild(flower.container)

    } catch (error) {
      console.log("GGG", error)
    }


    application.ticker.add(() => {
      TWEEN.update()
    })
  },
  clickColor1() {
    my.emit("changeColor", '0x00ff00')
  },
  clickColor2() {
    my.emit("changeColor", '0x000000')
  }
})