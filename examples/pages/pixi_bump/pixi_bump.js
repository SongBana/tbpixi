import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
require("dmpixi/lib/pixi-plugins/pixi-spine/pixi-spine");
import Bump from "../../../lib/pixi-plugins/bump/bump"
const pixiObj = {
  canvas: null,
  context: null,
  // pixi Application
  pixiApplication: null,
  pixiOptions: null,
  ballAry: [],
  bunny: null,
  isGameOver: false,
};

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


    //实例化Bump
    let b = new Bump(PIXI);

    let ttt = setInterval(() => {
      if (pixiObj.ballAry.length > 8 || pixiObj.isGameOver) {
        clearInterval(ttt);
        ttt = null;
      }
      const ball = createBall(
        Math.random() * application.screen.width,
        Math.random() * application.screen.height
      );
      pixiObj.ballAry.push(ball);
    }, 1000);

    function createBall(x, y, name) {
      const ball = new PIXI.Sprite(
        PIXI.Texture.fromImage(
          "https://img.alicdn.com/imgextra/i4/732742758/O1CN01SIHDFC1WFDAb7NUJh_!!732742758.png"
        )
      );
      ball.name = "ball";
      ball.x = x;
      ball.y = y;
      ball.width = 60;
      ball.height = 60;
      ball.vx = 2;
      ball.vy = 2;
      ball.speed = 1;
      ball.circular = true;
      application.stage.addChild(ball);
      return ball;
    }

    function addBig(x, y, w, h, name) {
      const Big = new PIXI.Sprite();
      Big.name = name;
      Big.width = w;
      Big.height = h;
      Big.x = x;
      Big.y = y;
      application.stage.addChild(Big);
      return Big;
    }

    pixiObj.leftb = addBig(0, 0, 1, application.screen.height, "left");
    pixiObj.rightb = addBig(
      application.screen.width - 1,
      0,
      1,
      application.screen.height,
      "right"
    );
    pixiObj.topb = addBig(0, 0, application.screen.width, 1, "top");
    pixiObj.bottomb = addBig(
      0,
      application.screen.height - 1,
      application.screen.width,
      1,
      "bottom"
    );

    // create a texture from an image path
    const texture = PIXI.Texture.fromImage(
      "https://img.alicdn.com/imgextra/i2/732742758/O1CN01FYlWsH1WFDAZswCmQ_!!732742758.png"
    );

    // Scale mode for pixelation
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    pixiObj.bunny = createBunny(
      application.screen.width / 2,
      application.screen.height / 2
    );

    application.ticker.add(() => {
      pixiObj.ballAry.forEach((a) => {
        if (
          b.hit(
            a,
            [pixiObj.rightb, pixiObj.leftb, pixiObj.bottomb, pixiObj.topb],
            true,
            true
          )
        ) {
          a.speed += 0.5;
          console.log("碰撞到了");
        }
        if (b.hit(a, pixiObj.bunny, true, true)) {
          console.log("碰撞到了人物");
          pixiObj.isGameOver = true;
        }
        if (!pixiObj.isGameOver) {
          a.x += a.vx * a.speed;
          a.y += a.vy * a.speed;
        }
      });
    });
    function createBunny(x, y) {
      console.log("bunny", x, y);
      // create our little bunny friend..
      var bunny = new PIXI.Sprite(texture);

      // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
      bunny.interactive = true;

      // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
      bunny.buttonMode = true;

      // center the bunny's anchor point
      bunny.anchor.set(0.5);

      // make it a bit bigger, so it's easier to grab
      bunny.scale.set(3);

      // setup events for mouse + touch using
      // the pointer events
      bunny
        .on("touchstart", onDragStart)
        .on("touchend", onDragEnd)
        .on("touchendoutside", onDragEnd)
        .on("touchmove", onDragMove);

      // move the sprite to its designated position
      bunny.x = x;
      bunny.y = y;

      // add it to the stage
      application.stage.addChild(bunny);
      return bunny;
    }

    function onDragStart(event) {
      console.log("44444");
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
    }

    function onDragEnd() {
      this.alpha = 1;
      this.dragging = false;
      // set the interaction data to null
      // this.data = null;
    }

    function onDragMove() {
      if (this.dragging && !pixiObj.isGameOver) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
      }
    }
  },
})