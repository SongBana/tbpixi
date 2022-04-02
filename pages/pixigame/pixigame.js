import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";

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
      backgroundColor: 0x000000,
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


    // 1.添加图片素材案例 
    this.pointText = PIXI.Texture.from("https://img.alicdn.com/imgextra/i2/751308485/O1CN01JE99Bh2CYBIV9w2Bq_!!751308485.png");
    const sprite = new PIXI.Sprite(this.pointText);
    sprite.anchor.set(0.5);
    sprite.width = 90;
    sprite.height = 90;
    sprite.name = 'taskPoint';
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.position.set(40, 40)
    stage.addChild(sprite)

    
    
  }
})