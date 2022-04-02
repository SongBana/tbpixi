import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
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
    const that = this
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
          /**
           * 这个demo。json中一共有四个动画
           */
          // 1.跳
          if (animation.state.hasAnimation('jump')) {
            animation.state.setAnimation(0, 'jump', true);
          }
          that.animation = animation

          // 2.跑
          // if (animation.state.hasAnimation('run')) {
          //   animation.state.setAnimation(0, 'run', true);
          // }

          // 3.死亡
          // if (animation.state.hasAnimation('death')) {
          //   animation.state.setAnimation(0, 'death', true);
          // }

          // 4.hit
          // if (animation.state.hasAnimation('hit')) {
          //   animation.state.setAnimation(0, 'hit', true);
          // }

          application.stage.addChild(animation);
          application.start();
        } catch (err) {
          console.log("异常", err)
        }
      })
  },
  onClickAction(e) {
    const { currentTarget: {
      dataset: {
        type
      }
    } } = e
    const animation = this.animation
    switch (type) {
      case "1":
        if (animation.state.hasAnimation('jump')) {
          animation.state.setAnimation(0, 'jump', true);
        }
        break;
      case "2":
        if (animation.state.hasAnimation('run')) {
          animation.state.setAnimation(0, 'run', true);
        }
        break;
      case "3":
        if (animation.state.hasAnimation('hit')) {
          animation.state.setAnimation(0, 'hit', true);
        }
        break;
      case "4":
        if (animation.state.hasAnimation('death')) {
          animation.state.setAnimation(0, 'death', true);
        }
        break;

      default:
        break;
    }

  }
})