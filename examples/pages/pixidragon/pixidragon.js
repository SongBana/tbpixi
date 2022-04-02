import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
import Scroller from 'dmpixi'
const SpineBoyJSON = require("../../demos/alien-pro.json");
const Atlas = `
alien-pro.png
size: 1723,1243
format: RGBA8888
filter: Linear,Linear
repeat: none
back-foot
  rotate: false
  xy: 847, 4
  size: 16, 11
  orig: 16, 11
  offset: 0, 0
  index: -1
back-shin
  rotate: false
  xy: 826, 17
  size: 42, 48
  orig: 42, 48
  offset: 0, 0
  index: -1
back-thigh
  rotate: false
  xy: 870, 18
  size: 45, 47
  orig: 47, 47
  offset: 2, 0
  index: -1
backarmor
  rotate: true
  xy: 1517, 215
  size: 162, 181
  orig: 162, 182
  offset: 0, 1
  index: -1
body
  rotate: false
  xy: 1071, 334
  size: 196, 235
  orig: 196, 235
  offset: 0, 0
  index: -1
burst01
  rotate: true
  xy: 1300, 379
  size: 286, 309
  orig: 286, 309
  offset: 0, 0
  index: -1
burst02
  rotate: true
  xy: 1300, 667
  size: 309, 361
  orig: 311, 361
  offset: 2, 0
  index: -1
burst03-bg
  rotate: false
  xy: 518, 67
  size: 551, 449
  orig: 551, 453
  offset: 0, 0
  index: -1
burst03-fg
  rotate: true
  xy: 856, 571
  size: 670, 442
  orig: 678, 442
  offset: 0, 0
  index: -1
eye
  rotate: false
  xy: 1517, 67
  size: 146, 146
  orig: 150, 150
  offset: 2, 2
  index: -1
eye-highlight
  rotate: false
  xy: 917, 24
  size: 41, 41
  orig: 43, 43
  offset: 1, 1
  index: -1
eye-pupil
  rotate: false
  xy: 960, 30
  size: 35, 35
  orig: 35, 35
  offset: 0, 0
  index: -1
eye-stalk
  rotate: false
  xy: 1345, 2
  size: 147, 131
  orig: 147, 131
  offset: 0, 0
  index: -1
front-foot
  rotate: false
  xy: 826, 3
  size: 19, 12
  orig: 19, 12
  offset: 0, 0
  index: -1
front-lower-arm
  rotate: false
  xy: 1611, 540
  size: 110, 125
  orig: 110, 125
  offset: 0, 0
  index: -1
front-shin
  rotate: false
  xy: 606, 9
  size: 49, 56
  orig: 49, 56
  offset: 0, 0
  index: -1
front-thigh
  rotate: false
  xy: 772, 11
  size: 52, 54
  orig: 54, 54
  offset: 2, 0
  index: -1
front-upper-arm
  rotate: false
  xy: 657, 10
  size: 113, 55
  orig: 113, 55
  offset: 0, 0
  index: -1
head
  rotate: true
  xy: 1071, 35
  size: 297, 272
  orig: 297, 272
  offset: 0, 0
  index: -1
lower-back-arm
  rotate: false
  xy: 1611, 447
  size: 101, 91
  orig: 101, 91
  offset: 0, 0
  index: -1
metaljaw
  rotate: true
  xy: 1345, 135
  size: 242, 170
  orig: 243, 172
  offset: 1, 2
  index: -1
splat01
  rotate: false
  xy: 2, 2
  size: 514, 503
  orig: 514, 503
  offset: 0, 0
  index: -1
splat01-fg
  rotate: false
  xy: 1300, 978
  size: 406, 263
  orig: 406, 264
  offset: 0, 0
  index: -1
splat02
  rotate: true
  xy: 2, 507
  size: 734, 511
  orig: 734, 511
  offset: 0, 0
  index: -1
splat03
  rotate: true
  xy: 515, 518
  size: 723, 339
  orig: 723, 339
  offset: 0, 0
  index: -1
upper-back-arm
  rotate: true
  xy: 518, 5
  size: 60, 86
  orig: 60, 86
  offset: 0, 0
  index: -1
`;


const SpineBoyJSON2 = require("../../demos/dragon-ess.json");
const Atlas2 = `

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
      .add('spineboy_png', '/demos/alien-pro.png')
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
          // if (animation.state.hasAnimation('flying')) {
          //   animation.state.setAnimation(1, 'flying', true);
          // }
          if (animation.state.hasAnimation('jump')) {
            animation.state.setAnimation(0, 'jump', true);
          }
          
          application.stage.addChild(animation);
          application.start();
        } catch (err) {
          console.log("异常", err)
        }
      })
  }
})