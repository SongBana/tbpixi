import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
import scencConfig from "./config.json";
import Scroller from "dmpixi";
import TWEEN, { Tween } from "@tweenjs/tween.js";
let that;

let taskSprite;

Component({
  mixins: [],
  // 供pixi渲染的canvas
  canvas: null,
  context: null,
  // pixi Application
  pixiApplication: null,
  pixiOptions: null,
  scencConfig,
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
      backgroundColor: 0xffffff,
      // 是否强制用2d上下文渲染，如果为false,则优先使用webgl渲染
      forceCanvas: false
    },
    guide: false,
  },
  props: {
    onTaskClick: undefined,
    onPointAnimate: undefined,
  },
  didMount() {
    that = this;
    that.scencConfig = scencConfig

    // 滚动插件
    this.objScroller = new Scroller.Scroller(this.scrollerCallback, {
      zooming: true,
      animating: true,
      bouncing: false,
      animationDuration: 300,
      scrollingY: true,
      minZoom: 1,
      maxZoom: 1.5
    });

    this.objScroller.__enableScrollY = true;

  },
  didUpdate() { },
  didUnmount() {
    this.RemoveChild()

  },
  RemoveChild() {
    let removedChilds = this.rootContainer.removeChildren(0, this.rootContainer.children.length);
    removedChilds.forEach((c) => {
      c.destroy({
        children: true,
        texture: false,
        baseTexture: false,
      });
    });
  },
  methods: {
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
      stage.interactive = true;

      this.rootContainer = new PIXI.Container();
      this.rootContainer.name = 'root';
      this.rootContainer.position.set(0, 0)
      this.rootContainer.interactive = true;
      stage.addChild(this.rootContainer);
      // 背景图片
      this.bgContainer = new PIXI.Container();
      this.bgContainer.name = 'bg';
      this.bgContainer.position.set(0, 0);
      that.rootContainer.addChild(that.bgContainer);
      // 帧图
      this.animateContainer = new PIXI.Container();
      this.animateContainer.name = 'animate';
      this.animateContainer.position.set(0, 0);
      that.rootContainer.addChild(that.animateContainer);
      // 任务瞄点
      this.taskContainer = new PIXI.Container();
      this.taskContainer.name = 'taskContainer';
      this.animateContainer.position.set(0, 0);
      that.rootContainer.addChild(that.taskContainer);
      // 探测器
      that.pointContainer = new PIXI.Container();
      that.pointContainer.name = 'point';
      that.pointContainer.position.set(0, 0);
      that.rootContainer.addChild(that.pointContainer);

      // 热点纹理
      that.pointText = PIXI.Texture.from("https://img.alicdn.com/imgextra/i2/751308485/O1CN01JE99Bh2CYBIV9w2Bq_!!751308485.png");



      this.objScroller.setDimensions(this.pixiOptions.width, this.pixiOptions.height, this.pixiOptions.width, 11200);






      this.rootContainer.on("touchstart", this.onScrollStart)
        .on("touchmove", this.onScrollMove)
        .on("touchend", this.onScrollEnd)
        .on("touchcancel", this.onScrollEnd2)

      /**
       * 1、初始化容器
       * 2、预加载图片
       * 2、初始化背景
       * 3、初始化各自场景的隐藏点
       */

      this.initSceneContainer();
      this.initTaskContainer();

      application.ticker.add(() => {
        TWEEN.update()
      })

    },


    // scroller.js

    scrollerCallback(left, top, zoom) {
      console.log(`当前滚动条位置:${left},${top}`)
      console.log(`放大缩小:${zoom}`)
      var cur_Y, cur_X;
      cur_X = left;
      cur_Y = top;
      //todo 位移距离对应在哪个具体场景
      if (cur_Y > 550) {
        let offset = cur_Y - 550
        console.log("偏移量", offset)
        if (taskSprite) {
          taskSprite.visible = true
          taskSprite.position.set(331 + offset / 5, 950 + offset * 2)
        }
        console.log("偏移量位置", taskSprite.position)
      } else {
        if (taskSprite)
          taskSprite.visible = false
      }

      //当前场景相对移动
      that.rootContainer.position.x = -left;
      that.rootContainer.position.y = -top;
      that.rootContainer.scale.set(zoom);

    },
    onScrollStart(event) {


      const e = event.data.originalEvent;
      console.log('start start', e.touches)
      if (e.touches.length >= 2) { //判断是否有两个点在屏幕上

        that.isZoom = true;

        that.startTouch = e.touches; //得到第一组两个点
      }

      that.objScroller.doTouchStart(e.touches, e.timeStamp);
    },

    onScrollMove(event) {


      const e = event.data.originalEvent;
      console.log('move move', e.touches)
      if (that.isZoom && e.touches.length >= 2) {
        const now = e.touches; //得到第二组两个点
        const scale = that.getDistance(now[0], now[1]) / that.getDistance(that.startTouch[0], that.startTouch[1]);
        console.log('scale', scale)
        that.objScroller.doTouchMove(e.touches, e.timeStamp, scale);
      } else {
        that.objScroller.doTouchMove(e.touches, e.timeStamp, 1);
      }

    },

    onScrollEnd2(event) {

      const e = event.data.originalEvent;
      if (that.isZoom) {
        that.isZoom = false
      }

      that.objScroller.doTouchEnd(e.timeStamp);
    },


    onScrollEnd(event) {

      if (that.isZoom) {
        that.isZoom = false
      }
      const e = event.data.originalEvent;
      that.objScroller.doTouchEnd(e.timeStamp);
    },


    getDistance(p1, p2) {
      var x = p2.clientX - p1.clientX,

        y = p2.clientY - p1.clientY;

      return Math.sqrt((x * x) + (y * y));

    },

    //
    initAnimate(index) {

      const source = that.scencConfig.animate[index];
      const array = [];
      for (let k = 0; k < source.len; k++) {
        const $e = k < 10 ? `0${k}` : k;
        array.push({
          name: that.scencConfig.animate[index].name + '/' + k,
          url: source.urlPrefix + $e + '.png'
        })
      }
      let loader = new PIXI.loaders.Loader()
      loader.reset()
      loader.add(array).load((load, source) => {
        that.animatedSprite(index, source)
      }).on('complete', () => {
        loader.destroy()
      })

    },
    //初始化容器
    initSceneContainer() {
      const { stage, loader } = this.pixiApplication;
      const arr = [];
      for (let i = 0; i < that.scencConfig.bg.len; i++) {

        const $e = i + 2 < 10 ? `0${i + 2}` : i + 2;
        arr.push({
          name: 'scene' + i,
          url: that.scencConfig.bg.url + $e + '.png'
        })
      }
      loader.reset()
      // my.showLoading();
      loader.add(arr).load((load, source) => {

        that.onImgLoad(load, source)
      }).on("complete", () => {
        //  my.hideLoading();
      })


    },
    // 初始化任务瞄点
    initTaskContainer() {

      let item = {
        "name": "xiaoFeiTrade",
        "pointName": "huatong",
        "width": 130,
        "height": 130,
        "x": 331,
        "y": 950
      }

      let task;
      if (that.taskContainer.getChildByName(item.name)) {

        task = that.taskContainer.getChildByName(item.name);


      } else {

        task = new PIXI.Container();
        task.name = item.name;
        task.interactive = true;
        task.buttonMode = true;
        task.width = item.width;
        task.height = item.height;
        task.visible = false
        task.position.set(item.x - item.width / 2, item.y - item.height / 2 - 350);

        // 点击区域颜色
        // const graphics = new PIXI.Graphics();
        // graphics.beginFill(0xff0000, 0.6);
        // graphics.drawRoundedRect(0, 0, item.width, item.height, 30);
        // graphics.endFill();
        // task.addChild(graphics);
        const sprite = new PIXI.Sprite(that.pointText);
        sprite.anchor.set(0.5);
        sprite.width = 90;
        sprite.height = 90;
        sprite.name = 'taskPoint';
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.position.set(item.width / 2, item.height / 2)
        task.addChild(sprite);

        new TWEEN.Tween(sprite)
          .to({
            width: [70, 90],
            height: [70, 90],
            alpha: [0.5, 1]
          }, 2000)
          .delay(500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .repeat(99999)
          .start();
        that.taskContainer.addChild(task)
      }

      task.on("touchstart", (e) => {
        this.isTouching2 = false
      })
      task.on("touchmove", (e) => {
        this.isTouching2 = true
      })
      task.on("touchend", (e) => {
        if (this.isTouching2) return
        const name = e.target.name.split('/')[1];
        const taskName = that.scencConfig.taskPoint[name].taskName
        that.onBtnClick(taskName);
      })

      task.on("touchcancel", (e) => {
        if (this.isTouching2) return
        const name = e.target.name.split('/')[1];
        const taskName = that.scencConfig.taskPoint[name].taskName
        that.onBtnClick(taskName);
      })
      console.log('wudttttttt', that.taskContainer)

      taskSprite = task

    },

    // 预加载背景图片
    onImgLoad(load, source) {


      const { TextureCache } = PIXI.utils;
      const { stage } = that.pixiApplication;

      console.log('222', source)

      for (let key = 0; key < that.scencConfig.bg.len; key++) {
        const textuure = source['scene' + key].texture;
        const sprite = new PIXI.Sprite(textuure);
        sprite.width = that.scencConfig.bg.width;
        sprite.height = that.scencConfig.bg.height;
        sprite.name = 'scene' + key;
        if (key == 34) {
          sprite.height = 600;
        }
        sprite.position.set(0, key * that.scencConfig.bg.height)

        sprite.interactive = false;
        that.bgContainer.addChild(sprite);

      }
      console.log('舞台', that.pixiApplication.stage)

      // 动画
      that.animateIndex = 0;
      that.initAnimate(that.animateIndex)

    },
    // 帧精灵图
    animatedSprite(index) {

      const { TextureCache } = PIXI.utils;
      const { stage } = this.pixiApplication;
      console.log('name', TextureCache)

      let arr = []
      for (let i = 0; i < that.scencConfig.animate[index].len; i++) {
        arr.push(TextureCache[that.scencConfig.animate[index].name + '/' + i])
      }

      const sprite = new PIXI.extras.AnimatedSprite(arr)
      sprite.width = that.scencConfig.animate[index].width;
      sprite.height = that.scencConfig.animate[index].height;
      sprite.position.x = that.scencConfig.animate[index].x;
      sprite.position.y = that.scencConfig.animate[index].y - 350;
      sprite.name = that.scencConfig.animate[index].name;
      sprite.anchor.set(0.5);
      // if (that.scencConfig.animate[index].type && that.scencConfig.animate[index].type == 'guest') {
      //   sprite.visible = false;
      // }
      if (that.scencConfig.animate[index].tap) {
        sprite.interactive = true;

        // sprite.on('tap', (e) => {

        //   console.log('点击事件', that.scencConfig.animate[index].type)
        //   that.onBtnClick(that.scencConfig.animate[index].type)
        // })

        sprite.on("touchstart", (e) => {
          this.isTouching = false
        })
        sprite.on("touchmove", (e) => {
          this.isTouching = true
        })
        sprite.on("touchend", (e) => {
          console.log('tap tap', e)
          if (this.isTouching) return
          that.onBtnClick(that.scencConfig.animate[index].type)
        })

        sprite.on("touchcancel", (e) => {
          if (this.isTouching) return
          that.onBtnClick(that.scencConfig.animate[index].type)
        })
      }



      //精灵添加到舞台
      //const root = stage.getChildByName('root');
      this.animateContainer.addChild(sprite)
      //找到序列帧所在的图层，放到对应位置，并设置移动速度
      //sprite.loop=true;
      sprite.animationSpeed = 0.1; //控制速度
      sprite.play();//自动播放序列帧
      //this.pixiApplication.render()
    },

    onBtnClick(type) {

      that.props.onTaskClick && that.props.onTaskClick(type)
    },

    getRandomNum(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      return (Min + Math.round(Rand * Range));
    },
  },
});
