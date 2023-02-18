import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
require("dmpixi/lib/pixi-plugins/pixi-layers/pixi-layers");

Page({
  // 供pixi渲染的canvas
  canvas: null,
  context: null,
  // pixi Application
  pixiApplication: null,
  pixiOptions: null,
  totalHeight: 0,
  windowWidth: 750,
  data: {
    appOptions: {
      // 手动指定application的尺寸
      width: 750,
      height: 750,
      // 全屏-以窗口宽高作为application的尺寸，当设置此选项后，手动设置的width\height会失效
      // isFullScreen: true,
      // application是否背景透明
      // transparent: true,
      // 背景颜色
      backgroundColor: 0x00000,
      // 是否强制用2d上下文渲染，如果为false,则优先使用webgl渲染
      forceCanvas: true
    }
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    const info = my.getSystemInfoSync();
    this.windowWidth = info.windowWidth
    this.setData({
      appOptions: {
        // 手动指定application的尺寸
        width: info.windowWidth * info.pixelRatio,
        height: info.windowHeight * info.pixelRatio,
        // 全屏-以窗口宽高作为application的尺寸，当设置此选项后，手动设置的width\height会失效
        // isFullScreen: true,
        // application是否背景透明
        // transparent: true,
        // 背景颜色
        backgroundColor: 0x00000,
        // 是否强制用2d上下文渲染，如果为false,则优先使用webgl渲染
        forceCanvas: true
      }
    })
  },
  onPixiCanvasError(e) {
    console.log(e);
  },
  onPixiCanvasDidUnmount(e) {
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
    application.stage = new PIXI.display.Stage();
    const { stage } = application
    const text = new PIXI.Text('欢迎使用阿里小程序Pixi引擎', {
      fontSize: 32,
      fill: 0xFF0000
    });
    text.anchor.set(.5, 0);
    PIXI.Container
    // 750尺度下的舞台的宽高
    const { width, height } = options;
    stage.backgroundColor = 0x1099bb
    const group = new PIXI.display.Group(1, true);
    stage.addChild(text);
    stage.sortableChildren = true
    text.position.set(width / 2, 200);

    stage.addChild(new PIXI.display.Layer(group))

    const sprite = new PIXI.Sprite(PIXI.Texture.from('/resources/logo.png'));
    sprite.anchor.set(.5);
    sprite.zIndex = 8
    sprite.parentGroup = group
    sprite.position.set(width / 2, height / 2);
    stage.addChild(sprite);


    const sprite2 = new PIXI.Sprite(PIXI.Texture.from('/resources/bunny.png'));
    sprite2.anchor.set(.5);
    sprite2.zIndex = 2
    sprite2.parentGroup = group
    sprite2.position.set(width / 2, height / 2);
    stage.addChild(sprite2);

    // stage.updateStage();

    application.ticker.add(() => {
      // stage.updateStage();
    });
    //ceshi
    // const sprites = {};
    // const loader = PIXI.loader
    // loader.add("m1", "https://img.alicdn.com/imgextra/i4/751308485/O1CN01PO47eE2CYBIACeGtP_!!751308485.png")
    // loader.add("m2", "https://img.alicdn.com/imgextra/i2/751308485/O1CN01uTzxLG2CYBIGrlFr4_!!751308485.png")
    // loader.add("m3", "https://img.alicdn.com/imgextra/i4/751308485/O1CN01aY5Sp82CYBIGrlK0M_!!751308485.png")
    // loader.add("m4", "https://img.alicdn.com/imgextra/i3/751308485/O1CN01qCVk0T2CYBIJLAf62_!!751308485.png")
    // loader.add("m5", "https://img.alicdn.com/imgextra/i2/751308485/O1CN01FTUJuo2CYBILSzg6k_!!751308485.png")
    // loader.add("m6", "https://img.alicdn.com/imgextra/i2/751308485/O1CN01tDGAeo2CYBIMlQUtz_!!751308485.png")
    // loader.load((loader, resources) => {
    //   // resources is an object where the key is the name of the resource loaded and the value is the resource object.
    //   // They have a couple default properties:
    //   // - `url`: The URL that the resource was loaded from
    //   // - `error`: The error that happened when trying to load (if any)
    //   // - `data`: The raw data that was loaded
    //   // also may contain other properties based on the middleware that runs.
    //   console.log("图片加载完成")
    //   sprites.m1 = new PIXI.TilingSprite(resources.m1.texture);
    //   sprites.m2 = new PIXI.TilingSprite(resources.m2.texture);
    //   sprites.m3 = new PIXI.TilingSprite(resources.m3.texture);
    //   sprites.m4 = new PIXI.TilingSprite(resources.m4.texture);
    //   sprites.m5 = new PIXI.TilingSprite(resources.m5.texture);
    //   sprites.m6 = new PIXI.TilingSprite(resources.m6.texture);
    // });


    // loader.onProgress.add(() => {
    //   console.log("loading")
    // }); // called once per loaded/errored file
    // loader.onError.add((e) => {
    // }); // called once per errored file
    // loader.onLoad.add(() => { }); // called once per loaded file
    // const _this = this
    // loader.onComplete.add(() => {
    //   var tempHeight = 0
    //   Object.keys(sprites).forEach(k => {
    //     sprites[k].width = _this.windowWidth
    //     sprites[k].position.set(0, tempHeight)
    //     sprites[k].height = _this.windowWidth
    //     application.stage.addChild(sprites[k])
    //     tempHeight += _this.windowWidth
    //   });
    //   debugger
    //   _this.setData({
    //     appOptions: {
    //       // 手动指定application的尺寸
    //       width: _this.windowWidth,
    //       height: tempHeight,
    //       // 全屏-以窗口宽高作为application的尺寸，当设置此选项后，手动设置的width\height会失效
    //       // isFullScreen: true,
    //       // application是否背景透明
    //       // transparent: true,
    //       // 背景颜色
    //       backgroundColor: 0x00000,
    //       // 是否强制用2d上下文渲染，如果为false,则优先使用webgl渲染
    //       forceCanvas: true
    //     }
    //   })
    // }); // called once when the queued resources all load.
  },
  onReady() {

  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'Demo-Application',
      desc: 'Demo-Application',
      path: 'pages/application/index',
    };
  },
});
