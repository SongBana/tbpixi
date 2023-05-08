import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
import TWEEN from "@tweenjs/tween.js";
export default class Flower {
  originSprite = null
  clearSrpite = null
  animateSprite = null
  container = null

  // 图片
  whiteImage = "https://img.alicdn.com/imgextra/i4/1761495540/O1CN01e6xKIV1qnN2UGnxf5_!!1761495540-2-isvtu.png";// 白色花
  // origin
  originImage = "https://img.alicdn.com/imgextra/i3/1761495540/O1CN01TmxQyX1qnN2UDeKjI_!!1761495540-2-isvtu.png"
  // 圆点
  dotImage = "https://img.alicdn.com/imgextra/i3/1761495540/O1CN010K5vpY1qnN2h7vdzB_!!1761495540-2-isvtu.png"

  //笔触的颜色
  penColor = "0x00ffff"

  //颜色数组
  colorAry = []

  // emitEvent
  emitEvent = null
  constructor() {
  }

  static initFromImage(image) {
    const flower = new Flower()
    const container = new PIXI.Container();
    container.scale.set(1.5, 1.5)
    flower.container = container
    flower.addSprite(image)
    this.emitEvent = my.on("changeColor", (color) => {
      console.log("color", color)
      flower.penColor = color
    })
    return flower
  }

  destroy() {
    if (this.emitEvent) this.emitEvent.remove()
  }

  addSprite(image) {
    try {
      const originSprite = new PIXI.Sprite.from(image);
      originSprite.anchor.x = 0.5;
      originSprite.anchor.y = 0.5;
      this.originSprite = originSprite
      const clearSprite = new PIXI.Sprite.from(this.whiteImage);
      clearSprite.anchor.x = 0.5;
      clearSprite.anchor.y = 0.5;
      clearSprite.interactive = true
      // clearSprite.scale.set(0.9, 0.9)
      this.clearSprite = clearSprite
      this.originSprite.mask = clearSprite;
      this.container.addChild(originSprite)
      this.container.addChild(clearSprite)
      this.addSpriteClick(clearSprite)
    } catch (error) {
      console.error(error)
    }
  }

  addMask() {
    try {
      console.log("添加梦层", this.penColor)
      const colorSprite = new PIXI.Sprite.from(this.whiteImage);
      colorSprite.tint = this.penColor
      colorSprite.interactive = true
      colorSprite.anchor.x = 0.5;
      colorSprite.anchor.y = 0.5;

      const dotSprite = new PIXI.Sprite.from(this.dotImage);
      dotSprite.anchor.x = 0.5;
      dotSprite.anchor.y = 0.5;
      dotSprite.interactive = true
      colorSprite.mask = dotSprite
      this.colorAry.push({
        sprite1: colorSprite,
        sprite2: dotSprite
      })
      this.container.addChild(colorSprite)
      this.addSpriteClick(dotSprite)
      this.container.addChild(dotSprite)
      if (this.colorAry.length > 2) {
        this.container.removeChild(this.colorAry[0].sprite1)
        this.container.removeChild(this.colorAry[0].sprite2)
        this.colorAry.unshift()
      }

      new TWEEN.Tween(dotSprite.scale)
        .to({
          x: 15,
          y: 15
        }, 1000)
        .easing(TWEEN.Easing.Linear.None)
        .start();

    } catch (error) {
      console.error(error)
    }
  }

  addSpriteClick(sprite) {
    const that = this
    sprite.on("touchstart", (e) => {
      this.isTouching2 = false
    })
    sprite.on("touchmove", (e) => {
      this.isTouching2 = true
    })
    sprite.on("touchend", (e) => {
      if (this.isTouching2) return
      that.addMask()
    })

    sprite.on("touchcancel", (e) => {
      console.log("点击了哈")
      if (this.isTouching2) return
    })
  }


  position(x, y) {
    this.container.position.set(x, y)
  }
}
