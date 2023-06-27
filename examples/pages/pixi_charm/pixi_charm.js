import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
require("dmpixi/lib/pixi-plugins/pixi-spine/pixi-spine");
import Charm from "../../../lib/pixi-plugins/charm/charm"
import shoe_posiiton from "./shoe_posiiton";

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

      const shoelist = shoe_posiiton
      let c = new Charm(PIXI);

      const texture2 = PIXI.Texture.fromImage("https://img.alicdn.com/imgextra/i1/2209419019448/O1CN01RUxdpV2JfEsmhIfqD_!!2209419019448-2-isvtu.png")

      var bunny2 = new PIXI.Sprite(texture2);
      bunny2.width = 650
      bunny2.height = 342
      bunny2.x = 50;
      bunny2.y = 150;
      // application.stage.addChild(bunny2);

      const texture = PIXI.Texture.fromImage(
        "https://img.alicdn.com/imgextra/i2/732742758/O1CN01FYlWsH1WFDAZswCmQ_!!732742758.png"
      );


      // create our little bunny friend..
      var bunny = new PIXI.Sprite(texture);
      bunny.anchor.set(0.5);
      bunny.scale.set(2);
      bunny.x = shoelist[0].x;
      bunny.y = shoelist[0].y;
      application.stage.addChild(bunny);

      // 简单的位移动画
      // c.slide(bunny, 500, 600, 120);
      const list2 = []
      for (let index = 0; index < shoelist.length; index++) {
        const element = shoelist[index];
        list2.push([element.x, element.y])
      }
      // 路径动画
      c.walkPath(
        bunny, //需要移动的精灵
        list2, //贝塞尔曲线数组
        500, //持续时间，以帧为单位
        "smoothstep", //缓动类型
        false, //yoyo
        1000 //yoyo之前的延迟时间
      );


      let bezierLine = new PIXI.Graphics();
      bezierLine.lineStyle(4, 0x000000, 1);
      bezierLine.moveTo(shoelist[0].x, shoelist[0].y);
      for (let index = 0; index < shoelist.length; index++) {
        const element = shoelist[index];

        if (element.type == 'line') {
          bezierLine.lineTo(element.x, element.y);
        } else if (element.type == 'curve') {
          // bezierLine.bezierCurveTo(element.x, element.y);
        }
      }

      stage.addChild(bezierLine);

      application.ticker.add(() => {
        c.update()
      })
    } catch (error) {
      console.error(error)
    }
  }
})