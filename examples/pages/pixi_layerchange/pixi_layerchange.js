import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
require("dmpixi/lib/pixi-plugins/pixi-spine/pixi-spine");
// const SpineBoyJSON = require("../../demos/dragon-ess.json");
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


    let color = "https://img.alicdn.com/imgextra/i3/2208186624252/O1CN01JZP0M81hHSthRiZH9_!!2208186624252-2-isvtu.png";
    let blackWhite = "https://img.alicdn.com/imgextra/i2/2208186624252/O1CN01To6Oxp1hHStbSkvrY_!!2208186624252-2-isvtu.png";
    let clear = "https://img.alicdn.com/imgextra/i2/2208186624252/O1CN011QkFtV1hHStm8r52p_!!2208186624252-2-isvtu.png";

    //需要用到的精灵
    let colorSprite;
    let blackWhiteSprite;
    let clearSprite;

    let resources = PIXI.loader.resources;

    loader
      .add([color, blackWhite, clear])
      .load((loader, resources) => {
        console.log("resources", resources)
        colorSprite = new PIXI.Sprite(resources[color].texture);
        blackWhiteSprite = new PIXI.Sprite(resources[blackWhite].texture);
        clearSprite = new PIXI.Sprite(resources[clear].texture);

        clearSprite.x = application.renderer.screen.width / 2;
        clearSprite.y = application.renderer.screen.height / 2;
        clearSprite.anchor.x = 0.5;
        clearSprite.anchor.y = 0.5;

        colorSprite.mask = clearSprite;

        //把精灵添加到舞台上
        stage.addChild(blackWhiteSprite);
        stage.addChild(colorSprite);
        stage.addChild(clearSprite);
      })

    application.ticker.add(() => {
      if (clearSprite && clearSprite.width < application.renderer.screen.width) {
        clearSprite.width += 4;
        clearSprite.height += 4;
        clearSprite.x -= 1;
        clearSprite.y -= 1;
      }
    })

  }
})