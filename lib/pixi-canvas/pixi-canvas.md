# pixi-miniprogram Canvas 使用方法


本模板主要使用Pixi引擎作为基础，实现手淘Canvas绘制，我们对Pixi原有4.8.8引擎进行了改写，实现了对Canvas的兼容。项目开发非常接近web Pixi。


- Pixi API : [https://g.alicdn.com/mm/pixi-miniprogram-docs/1.0.12/index.html](https://g.alicdn.com/mm/pixi-miniprogram-docs/1.0.12/index.html)



#### 开发IDE：


- 阿里小程序IDE:[https://miniapp.open.taobao.com/docV3.htm?docId=117780&docType=1](https://miniapp.open.taobao.com/docV3.htm?docId=117780&docType=1)



#### 注意：


- 目前Canvas要求手淘版本 > 9.7.0，项目中需要进行判断版本，进行降级抄底
- Canvas 2d: 要求手淘版本 > 9.7.0
- webGL : 要求手淘版本 > 9.9.0



#### 引擎包：


- @tbminiapp/pixi-miniprogram-engine



#### 使用方式：


- 配置流程:启用Canvas -> 页面Canvas组件 ->侦听Canvas组件onReady事件->my.createCanvas ->成功回调后，设置canvas尺寸->使用PIXI.miniprogram.registerCanvas将Canvas注册给pixi->实例化PIXI.Application(注意resolution为当前设备像素密度)->侦听Canvas的onTouchStart\onTouchEnd\onTouchMove 事件通过onTouchHandle侦听



#### 1.开启使用Canvas:


app.json 增加配置项：


- 手淘："enableSkia": "true"



```javascript
{
  "pages": [
    "pages/index/index"
  ],
  "window": {
    "defaultTitle": "My App",
    "enableSkia": "true"
  }
}
```


#### 2.安装@tbminiapp/pixi-miniprogram-engine依赖，以及pixi的type描述依赖


**2.1:npm包安装**


```javascript
tnpm install @tbminiapp/pixi-miniprogram-engine--by=yarn
tnpm install @types/pixi.js@4.7.5 --by=yarn
```


#### 3.引用pixi-canvas组件


- index.axml



```javascript
<pixi-canvas id="pixi-canvas" options={{appOptions}} destroyAppOnDidUnmount="true" onError="onPixiCanvasError" onDidUnmount="onPixiCanvasDidUnmount" onAppInit="onAppInit"></pixi-canvas>
```


- index.json



```javascript
{
  "usingComponents":{
      "pixi-canvas": "/components/pixi-canvas/pixi-canvas"
  }
}
```


#### 4.在js中编写pixi-canvas的 事件监听


```javascript
import { Texture, Sprite, Text } from "@tbminiapp/pixi-miniprogram-engine";
Page({
  // 供pixi渲染的canvas
  canvas: null,
  context: null,
  // pixi Application
  pixiApplication: null,
  pixiOptions: null,
  data: {
    appOptions: {
      // 手动指定application的尺寸
      width:750,
      height:750,
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
  },
  // 当pixi-canvas初始化错误下的回调
  onPixiCanvasError(e){
    console.log(e);
  },
   // 当pixi-canvas组件dinunmount时候回调
  onPixiCanvasDidUnmount(e){
    this.canvas = null;
    this.context = null;
    this.pixiApplication = null;
  },
  // 当pixi-canvas组件初始化完成下回调
  onAppInit(e) {
    // canvas: canvas对象
    // context: 当前canvas使用的上下文
    // options: 当前pixi application 的设置项
    // application: 当前初始化的pixi application 
    const { canvas, context, options, application } = e
    this.canvas = canvas;
    this.context = context;
    this.pixiApplication = application;
    this.pixiOptions = options;
    const { stage } = application
    const text = new Text('欢迎使用阿里小程序Pixi引擎', {
      fontSize: 32,
      fill: 0xFF0000
    });
    text.anchor.set(.5, 0);
    // 750尺度下的舞台的宽高
    const { width, height } = application.scrren;
    stage.addChild(text);
    text.position.set(width / 2, 200);
    const sprite = new Sprite(Texture.from('/resources/logo.png'));
    stage.addChild(sprite);
    sprite.anchor.set(.5);
    sprite.position.set(width / 2, height / 2);

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
```
