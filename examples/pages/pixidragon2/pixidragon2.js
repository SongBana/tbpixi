import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
const SpineBoyJSON = require("../../demos/dragon-ess.json");
const Atlas = `

dragon-ess.png
size: 1971,667
format: RGBA8888
filter: Linear,Linear
repeat: none
back
  rotate: false
  xy: 1048, 95
  size: 190, 185
  orig: 190, 185
  offset: 0, 0
  index: -1
chest
  rotate: false
  xy: 1663, 82
  size: 136, 122
  orig: 136, 122
  offset: 0, 0
  index: -1
chin
  rotate: false
  xy: 461, 40
  size: 214, 146
  orig: 214, 146
  offset: 0, 0
  index: -1
front-toe-a
  rotate: true
  xy: 2, 3
  size: 29, 50
  orig: 29, 50
  offset: 0, 0
  index: -1
front-toe-b
  rotate: false
  xy: 1914, 352
  size: 55, 57
  orig: 56, 57
  offset: 1, 0
  index: -1
head
  rotate: false
  xy: 204, 408
  size: 296, 257
  orig: 296, 260
  offset: 0, 0
  index: -1
left-front-leg
  rotate: false
  xy: 677, 149
  size: 84, 57
  orig: 84, 57
  offset: 0, 0
  index: -1
left-front-thigh
  rotate: true
  xy: 1876, 10
  size: 84, 72
  orig: 84, 72
  offset: 0, 0
  index: -1
left-rear-leg
  rotate: false
  xy: 867, 6
  size: 168, 131
  orig: 206, 177
  offset: 19, 21
  index: -1
left-rear-thigh
  rotate: true
  xy: 1037, 2
  size: 91, 147
  orig: 91, 149
  offset: 0, 0
  index: -1
left-wing01
  rotate: true
  xy: 1406, 225
  size: 191, 256
  orig: 191, 256
  offset: 0, 0
  index: -1
left-wing02
  rotate: true
  xy: 1135, 282
  size: 178, 269
  orig: 179, 269
  offset: 0, 0
  index: -1
left-wing03
  rotate: true
  xy: 839, 139
  size: 186, 207
  orig: 186, 207
  offset: 0, 0
  index: -1
left-wing04
  rotate: false
  xy: 677, 2
  size: 188, 135
  orig: 188, 135
  offset: 0, 0
  index: -1
left-wing05
  rotate: true
  xy: 456, 188
  size: 218, 212
  orig: 218, 213
  offset: 0, 0
  index: -1
left-wing06
  rotate: true
  xy: 814, 473
  size: 192, 331
  orig: 192, 331
  offset: 0, 0
  index: -1
left-wing07
  rotate: true
  xy: 204, 16
  size: 159, 255
  orig: 159, 255
  offset: 0, 0
  index: -1
left-wing08
  rotate: false
  xy: 1240, 99
  size: 164, 181
  orig: 164, 181
  offset: 0, 0
  index: -1
left-wing09
  rotate: true
  xy: 670, 208
  size: 204, 167
  orig: 204, 167
  offset: 0, 0
  index: -1
right-front-leg
  rotate: false
  xy: 1457, 12
  size: 101, 89
  orig: 101, 89
  offset: 0, 0
  index: -1
right-front-thigh
  rotate: false
  xy: 1801, 96
  size: 108, 108
  orig: 108, 108
  offset: 0, 0
  index: -1
right-rear-leg
  rotate: true
  xy: 1561, 107
  size: 116, 100
  orig: 116, 100
  offset: 0, 0
  index: -1
right-rear-thigh
  rotate: true
  xy: 1186, 2
  size: 91, 147
  orig: 91, 149
  offset: 0, 0
  index: -1
right-rear-toe
  rotate: false
  xy: 1658, 3
  size: 105, 77
  orig: 109, 77
  offset: 0, 0
  index: -1
right-wing01
  rotate: true
  xy: 502, 447
  size: 218, 310
  orig: 219, 310
  offset: 0, 0
  index: -1
right-wing02
  rotate: true
  xy: 1147, 462
  size: 203, 305
  orig: 203, 305
  offset: 0, 0
  index: -1
right-wing03
  rotate: false
  xy: 1454, 418
  size: 272, 247
  orig: 272, 247
  offset: 0, 0
  index: -1
right-wing04
  rotate: false
  xy: 854, 327
  size: 279, 144
  orig: 279, 144
  offset: 0, 0
  index: -1
right-wing05
  rotate: false
  xy: 204, 177
  size: 250, 229
  orig: 251, 229
  offset: 1, 0
  index: -1
right-wing06
  rotate: false
  xy: 2, 299
  size: 200, 366
  orig: 200, 366
  offset: 0, 0
  index: -1
right-wing07
  rotate: false
  xy: 2, 34
  size: 200, 263
  orig: 200, 263
  offset: 0, 0
  index: -1
right-wing08
  rotate: false
  xy: 1728, 411
  size: 234, 254
  orig: 234, 254
  offset: 0, 0
  index: -1
right-wing09
  rotate: false
  xy: 1664, 206
  size: 248, 203
  orig: 248, 204
  offset: 0, 1
  index: -1
tail01
  rotate: true
  xy: 1406, 103
  size: 120, 153
  orig: 120, 153
  offset: 0, 0
  index: -1
tail02
  rotate: true
  xy: 1335, 2
  size: 95, 120
  orig: 95, 120
  offset: 0, 0
  index: -1
tail03
  rotate: false
  xy: 1801, 2
  size: 73, 92
  orig: 73, 92
  offset: 0, 0
  index: -1
tail04
  rotate: true
  xy: 763, 150
  size: 56, 71
  orig: 56, 71
  offset: 0, 0
  index: -1
tail05
  rotate: false
  xy: 1914, 291
  size: 52, 59
  orig: 52, 59
  offset: 0, 0
  index: -1
tail06
  rotate: false
  xy: 1561, 37
  size: 95, 68
  orig: 95, 68
  offset: 0, 0
  index: -1
thiagobrayner
  rotate: false
  xy: 502, 414
  size: 350, 31
  orig: 350, 31
  offset: 0, 0
  index: -1
`;

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
      .add('spineboy_png', '/demos/dragon-ess.png')
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

          // 起飞的动画
          if (animation.state.hasAnimation('flying')) {
            animation.state.setAnimation(1, 'flying', true);
          }

          application.stage.addChild(animation);
          application.start();
        } catch (err) {
          console.log("异常", err)
        }
      })
  }
})