import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
require("dmpixi/lib/pixi-plugins/pixi-spine/pixi-spine");
const SpineBoyJSON = require("../../demos/adpkrun4/adpkrun4.json");
const Atlas = `
adpkrun4.png
size: 512,512
format: RGBA8888
filter: Linear,Linear
repeat: none
sd
  rotate: false
  xy: 1, 152
  size: 164, 78
  orig: 164, 78
  offset: 0, 0
  index: -1
f2
  rotate: false
  xy: 199, 1
  size: 177, 40
  orig: 177, 40
  offset: 0, 0
  index: -1
f1
  rotate: false
  xy: 199, 78
  size: 111, 33
  orig: 111, 33
  offset: 0, 0
  index: -1
l2
  rotate: false
  xy: 95, 232
  size: 32, 152
  orig: 32, 152
  offset: 0, 0
  index: -1
l1
  rotate: false
  xy: 199, 210
  size: 58, 131
  orig: 58, 131
  offset: 0, 0
  index: -1
l1a
  rotate: false
  xy: 1, 232
  size: 58, 131
  orig: 58, 131
  offset: 0, 0
  index: -1
l2a
  rotate: false
  xy: 61, 232
  size: 32, 152
  orig: 32, 152
  offset: 0, 0
  index: -1
as
  rotate: false
  xy: 167, 120
  size: 112, 88
  orig: 112, 88
  offset: 0, 0
  index: -1
shoe
  rotate: false
  xy: 129, 232
  size: 37, 69
  orig: 37, 69
  offset: 0, 0
  index: -1
f1a
  rotate: false
  xy: 199, 43
  size: 111, 33
  orig: 111, 33
  offset: 0, 0
  index: -1
hd
  rotate: false
  xy: 109, 1
  size: 88, 117
  orig: 88, 117
  offset: 0, 0
  index: -1
bd
  rotate: false
  xy: 1, 1
  size: 106, 149
  orig: 106, 149
  offset: 0, 0
  index: -1
sy
  rotate: false
  xy: 37, 418
  size: 34, 49
  orig: 34, 49
  offset: 0, 0
  index: -1
sb
  rotate: false
  xy: 1, 418
  size: 34, 53
  orig: 34, 53
  offset: 0, 0
  index: -1
sw
  rotate: false
  xy: 129, 303
  size: 37, 69
  orig: 37, 69
  offset: 0, 0
  index: -1
yy
  rotate: false
  xy: 1, 365
  size: 57, 51
  orig: 57, 51
  offset: 0, 0
  index: -1
`
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

    loader
      .add('spineboy_png', '/demos/adpkrun4/adpkrun4.png')
      .load((loader, resources) => {
        try {
          console.log('loaded');
          const rawSkeletonData = SpineBoyJSON;
          const rawAtlasData = Atlas; //your atlas file

          const spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, function (line, callback) {
            callback(PIXI.BaseTexture.from('spineboy_png'));
          });


          const spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
          const spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);

          spineJsonParser.scale = 2.0;

          const spineData = spineJsonParser.readSkeletonData(rawSkeletonData);

          const animation = new PIXI.spine.Spine(spineData);

          animation.position.set(300, 600);
          animation.scale.set(0.3, 0.3);

          animation.interactive = true;
          animation.on("touchend", (e) => {
            my.alert({
              content: '123'
            })
          })
          // 起飞的动画
          if (animation.state.hasAnimation('newAnimation')) {
            animation.state.setAnimation(1, 'newAnimation', true);
          }

          application.stage.addChild(animation);
          application.start();
        } catch (err) {
          console.log("异常", err)
        }
      })
  }
})