import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
require("dmpixi/lib/pixi-plugins/pixi-spine/pixi-spine");
const SpineBoyJSON = require("../../demos/SwordsMan/SwordsMan_Swordsman.json");
const Atlas = `
SwordsMan.png
size: 1024,1024
format: RGBA8888
filter: Linear,Linear
repeat: none
qqqqq
  rotate: false
  xy: 273, 424
  size: 271, 76
  orig: 271, 76
  offset: 0, 0
  index: -1
effect1
  rotate: false
  xy: 220, 586
  size: 200, 76
  orig: 201, 76
  offset: 0, 0
  index: -1
effect3
  rotate: false
  xy: 640, 641
  size: 263, 45
  orig: 264, 45
  offset: 1, 0
  index: -1
effect4
  rotate: false
  xy: 1, 975
  size: 277, 15
  orig: 278, 15
  offset: 0, 0
  index: -1
effect5
  rotate: false
  xy: 1, 963
  size: 215, 10
  orig: 215, 10
  offset: 0, 0
  index: -1
effect2
  rotate: false
  xy: 1, 618
  size: 186, 72
  orig: 188, 72
  offset: 1, 0
  index: -1
feng1
  rotate: false
  xy: 1, 1
  size: 367, 263
  orig: 367, 263
  offset: 0, 0
  index: -1
huo2
  rotate: false
  xy: 939, 179
  size: 81, 79
  orig: 81, 79
  offset: 0, 0
  index: -1
huo1
  rotate: false
  xy: 454, 701
  size: 71, 119
  orig: 71, 119
  offset: 0, 0
  index: -1
fiii1
  rotate: false
  xy: 90, 844
  size: 39, 90
  orig: 39, 90
  offset: 0, 0
  index: -1
fii3
  rotate: false
  xy: 49, 844
  size: 39, 95
  orig: 39, 95
  offset: 0, 0
  index: -1
fii2
  rotate: false
  xy: 955, 681
  size: 37, 90
  orig: 37, 90
  offset: 0, 0
  index: -1
fasheqi
  rotate: false
  xy: 737, 1
  size: 201, 176
  orig: 201, 176
  offset: 0, 0
  index: -1
zuowangx1
  rotate: false
  xy: 234, 919
  size: 95, 54
  orig: 95, 54
  offset: 0, 0
  index: -1
zuozhangx2
  rotate: false
  xy: 385, 924
  size: 52, 52
  orig: 52, 52
  offset: 0, 0
  index: -1
zuojian2
  rotate: false
  xy: 910, 357
  size: 75, 87
  orig: 75, 87
  offset: 0, 0
  index: -1
zuobi2
  rotate: false
  xy: 372, 830
  size: 102, 92
  orig: 102, 92
  offset: 0, 0
  index: -1
kuabu2
  rotate: false
  xy: 204, 923
  size: 25, 31
  orig: 25, 31
  offset: 0, 0
  index: -1
zuoxie21
  rotate: false
  xy: 152, 796
  size: 93, 57
  orig: 93, 57
  offset: 0, 0
  index: -1
zuoxie2
  rotate: false
  xy: 372, 664
  size: 66, 34
  orig: 66, 34
  offset: 0, 0
  index: -1
zuojiao1
  rotate: false
  xy: 273, 266
  size: 92, 128
  orig: 92, 128
  offset: 0, 0
  index: -1
guang12_1
  rotate: false
  xy: 90, 936
  size: 18, 22
  orig: 18, 22
  offset: 0, 0
  index: -1
guang11
  rotate: false
  xy: 1002, 521
  size: 17, 59
  orig: 17, 59
  offset: 0, 0
  index: -1
zuotui1
  rotate: false
  xy: 811, 524
  size: 85, 109
  orig: 85, 109
  offset: 0, 0
  index: -1
guang10
  rotate: false
  xy: 1, 772
  size: 46, 86
  orig: 46, 86
  offset: 0, 0
  index: -1
fubu
  rotate: false
  xy: 546, 438
  size: 136, 132
  orig: 136, 132
  offset: 0, 0
  index: -1
kudang
  rotate: false
  xy: 234, 855
  size: 83, 62
  orig: 83, 62
  offset: 0, 0
  index: -1
youxie21
  rotate: false
  xy: 898, 524
  size: 102, 63
  orig: 102, 63
  offset: 0, 0
  index: -1
youxie2
  rotate: false
  xy: 131, 923
  size: 71, 38
  orig: 71, 38
  offset: 0, 0
  index: -1
youjiao2
  rotate: false
  xy: 536, 572
  size: 102, 129
  orig: 102, 129
  offset: 0, 0
  index: -1
guang8
  rotate: false
  xy: 994, 681
  size: 25, 71
  orig: 25, 71
  offset: 0, 0
  index: -1
guang9
  rotate: false
  xy: 986, 153
  size: 20, 24
  orig: 20, 24
  offset: 0, 0
  index: -1
youtui2
  rotate: false
  xy: 189, 664
  size: 97, 130
  orig: 97, 130
  offset: 0, 0
  index: -1
guang7
  rotate: false
  xy: 154, 692
  size: 32, 78
  orig: 32, 78
  offset: 0, 0
  index: -1
guang6
  rotate: false
  xy: 189, 618
  size: 27, 40
  orig: 27, 40
  offset: 0, 0
  index: -1
lingzi
  rotate: false
  xy: 247, 804
  size: 74, 40
  orig: 74, 40
  offset: 0, 0
  index: -1
bozi
  rotate: false
  xy: 152, 855
  size: 80, 66
  orig: 80, 66
  offset: 0, 0
  index: -1
guang3
  rotate: false
  xy: 1, 992
  size: 59, 29
  orig: 59, 29
  offset: 0, 0
  index: -1
xiong
  rotate: false
  xy: 370, 265
  size: 182, 157
  orig: 182, 157
  offset: 0, 0
  index: -1
guang2
  rotate: false
  xy: 77, 692
  size: 75, 74
  orig: 75, 74
  offset: 0, 0
  index: -1
guang1
  rotate: false
  xy: 385, 978
  size: 34, 36
  orig: 34, 36
  offset: 0, 0
  index: -1
kuabu
  rotate: false
  xy: 811, 455
  size: 138, 67
  orig: 138, 67
  offset: 0, 0
  index: -1
boli
  rotate: false
  xy: 737, 179
  size: 200, 176
  orig: 200, 176
  offset: 0, 0
  index: -1
gaoguang
  rotate: false
  xy: 940, 132
  size: 44, 43
  orig: 44, 43
  offset: 0, 0
  index: -1
eji
  rotate: false
  xy: 554, 265
  size: 159, 171
  orig: 159, 171
  offset: 0, 0
  index: -1
jian
  rotate: false
  xy: 1, 692
  size: 74, 78
  orig: 74, 78
  offset: 0, 0
  index: -1
dapbing2
  rotate: false
  xy: 280, 975
  size: 33, 35
  orig: 33, 35
  offset: 0, 0
  index: -1
daobing3
  rotate: false
  xy: 63, 941
  size: 25, 11
  orig: 25, 11
  offset: 0, 0
  index: -1
daobing1
  rotate: false
  xy: 684, 438
  size: 16, 125
  orig: 16, 125
  offset: 0, 0
  index: -1
dao22
  rotate: false
  xy: 940, 1
  size: 49, 129
  orig: 94, 129
  offset: 28, 0
  index: -1
dao
  rotate: false
  xy: 715, 357
  size: 94, 282
  orig: 94, 282
  offset: 0, 0
  index: -1
xx2
  rotate: false
  xy: 991, 1
  size: 20, 150
  orig: 20, 150
  offset: 0, 0
  index: -1
xx1
  rotate: false
  xy: 152, 772
  size: 20, 21
  orig: 20, 21
  offset: 0, 0
  index: -1
xx3
  rotate: false
  xy: 987, 357
  size: 29, 86
  orig: 29, 86
  offset: 0, 0
  index: -1
xx4
  rotate: false
  xy: 905, 589
  size: 48, 129
  orig: 48, 129
  offset: 0, 0
  index: -1
xx5
  rotate: false
  xy: 131, 844
  size: 19, 45
  orig: 19, 45
  offset: 0, 0
  index: -1
dao1
  rotate: false
  xy: 331, 804
  size: 35, 126
  orig: 35, 126
  offset: 0, 0
  index: -1
zuozhangx1
  rotate: false
  xy: 439, 924
  size: 48, 56
  orig: 48, 56
  offset: 0, 0
  index: -1
youbi
  rotate: false
  xy: 288, 664
  size: 82, 138
  orig: 82, 138
  offset: 0, 0
  index: -1
guang13
  rotate: false
  xy: 131, 891
  size: 19, 23
  orig: 19, 23
  offset: 0, 0
  index: -1
youzhang
  rotate: false
  xy: 951, 446
  size: 68, 73
  orig: 68, 73
  offset: 0, 0
  index: -1
zuozhang1
  rotate: false
  xy: 331, 932
  size: 52, 59
  orig: 52, 59
  offset: 0, 0
  index: -1
zuozhang2
  rotate: false
  xy: 372, 701
  size: 80, 127
  orig: 80, 127
  offset: 0, 0
  index: -1
zuowang2
  rotate: false
  xy: 77, 768
  size: 73, 74
  orig: 73, 74
  offset: 0, 0
  index: -1
guang12
  rotate: false
  xy: 41, 941
  size: 20, 18
  orig: 20, 18
  offset: 0, 0
  index: -1
youwang
  rotate: false
  xy: 939, 260
  size: 64, 95
  orig: 64, 95
  offset: 0, 0
  index: -1
guang14
  rotate: false
  xy: 174, 772
  size: 13, 22
  orig: 13, 22
  offset: 0, 0
  index: -1
youjianjia
  rotate: false
  xy: 811, 357
  size: 97, 96
  orig: 97, 96
  offset: 0, 0
  index: -1
jianjianxx
  rotate: false
  xy: 640, 572
  size: 59, 58
  orig: 59, 58
  offset: 0, 0
  index: -1
zuowang1
  rotate: false
  xy: 955, 589
  size: 63, 90
  orig: 63, 90
  offset: 0, 0
  index: -1
feng2
  rotate: false
  xy: 370, 1
  size: 365, 262
  orig: 368, 263
  offset: 3, 0
  index: -1
effectdaoguang0005
  rotate: false
  xy: 1, 362
  size: 270, 81
  orig: 275, 100
  offset: 2, 3
  index: -1
effectdaoguang0001
  rotate: false
  xy: 220, 502
  size: 226, 82
  orig: 275, 100
  offset: 47, 17
  index: -1
effectdaoguang0002
  rotate: false
  xy: 1, 445
  size: 217, 86
  orig: 275, 100
  offset: 58, 13
  index: -1
effectdaoguang0003
  rotate: false
  xy: 1, 533
  size: 217, 83
  orig: 275, 100
  offset: 58, 13
  index: -1
effectdaoguang0004
  rotate: false
  xy: 1, 266
  size: 244, 94
  orig: 275, 100
  offset: 28, 1
  index: -1
effect11
  rotate: false
  xy: 448, 502
  size: 86, 197
  orig: 90, 197
  offset: 4, 0
  index: -1
guangx1
  rotate: false
  xy: 1, 860
  size: 38, 96
  orig: 38, 96
  offset: 0, 0
  index: -1
guangx2
  rotate: false
  xy: 315, 975
  size: 11, 28
  orig: 11, 28
  offset: 0, 0
  index: -1
guangx3
  rotate: false
  xy: 702, 438
  size: 11, 139
  orig: 11, 139
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
      .add('spineboy_png', '/demos/SwordsMan/SwordsMan.png')
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
          if (animation.state.hasAnimation('attack1_+1')) {
            animation.state.setAnimation(0, 'attack1_+1', true);
          }
          if (animation.state.hasAnimation('bicycle')) {
            animation.state.setAnimation(0, 'bicycle', true);
          }

          application.stage.addChild(animation);
          application.start();
        } catch (err) {
          console.log("异常", err)
        }
      })
  }
})