import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
const { registerCanvas, devicePixelRatio } = PIXI.miniprogram;
Component({
  systemInfo: null,
  mainCanvas: null,
  app: null,
  delayInitId: null,
  mixins: [],
  data: {
    isRunCanvas: false
  },
  props: {
    options: null,
    onAppInit: null,
    onError: null
  },
  onInit() {

  },
  didMount() {
    const systemInfo = this.systemInfo = my.getSystemInfoSync();
    const version = systemInfo.version.split('.');
    const version0 = version[0] * 1000;
    const version1 = version[1] * 1000;
    console.log('version', version);
    // 手淘 9.8 版本以后启动canvas。
    if (systemInfo.app === 'TB') {
      if (!(version0 > 9000 || (version0 === 9000 && version1 >= 8000))) {
        my.alert({
          title: '请使用手淘9.8版本以上'
        });
        return;
      }
    } else if (systemInfo.app === 'alipay') {
      if (!(version0 > 10000 || (version0 === 10000 && version1 >= 1000))) {
        // 降级
        my.alert({
          title: '请使用支付宝10.1版本以上'
        });
        return;
      }
    }
    const { options } = this.props;
    if (!options) {
      console.warn('pixi-canvas 缺少options');
      this.props.onError && this.props.onError.call(this, { code: -1, msg: 'pixi-canvas 缺少options' });
      return;
    }
    const { windowWidth, windowHeight } = systemInfo;
    const { isFullScreen, width, height } = options;
    let baseSize;
    if (isFullScreen) {
      baseSize = { width: 750, height: windowHeight * (750 / windowWidth) }
    } else {
      baseSize = { width, height };
    }
    this.setData({
      isRunCanvas: true,
      targetWidth: baseSize.width,
      targetHeight: baseSize.height
    });


  },
  deriveDataFromProps(prevProps) {
    if (prevProps.options.height !== this.data.targetHeight) {
      this.setData({
        targetHeight: prevProps.options.height
      })
    }
  },
  didUnmount() {
    const { app, props } = this;
    clearTimeout(this.delayInitId);
    if (app && (props.destroyAppOnDidUnmount === "true" || props.destroyAppOnDidUnmount === true || props.destroyAppOnDidUnmount === null || props.destroyAppOnDidUnmount === undefined)) {
      app.destroy();
      this.app = null;
      this.mainCanvas = null;
    }
    props.onDidUnmount && props.onDidUnmount.call(null, { code: 1, msg: 'pixi-canvas didUnmount' });
  },
  methods: {
    onCanvasReady() {
      my.createCanvas({
        id: 'canvas',
        success: (canvas) => {
          console.log('_createCanvas success');
          const { options } = this.props;
          if (!options) {
            console.warn('pixi-canvas 缺少options');
            this.props.onError && this.props.onError.call(this, { code: -1, msg: 'pixi-canvas 缺少options' });
            return;
          }
          const systemInfo = this.systemInfo || my.getSystemInfoSync();
          const { windowWidth } = systemInfo;

          let baseSize = { width: this.data.targetWidth, height: this.data.targetHeight };
          const scale = 375 / windowWidth;
          const canvasWidth = baseSize.width / 2 / scale;
          const resolution = canvasWidth / (baseSize.width / 2) * (devicePixelRatio / 2);
          options.resolution = resolution;
          options.width = baseSize.width;
          options.height = baseSize.height;
          clearTimeout(this.delayInitId);
          this.delayInitId = setTimeout(() => {
            registerCanvas(canvas);
            this.mainCanvas = canvas;
            this.initGameApplication(canvas, options);
          }, 100);
        }
      });
    },
    setDataPromise(...args) {
      return new Promise((resolve) => {
        this.setData(...args, () => resolve());
      });
    },
    initGameApplication(canvas, options) {
      console.log('initGameApplication');
      const application = this.app = new PIXI.Application({
        view: canvas,
        ...options
      });
      const context = application.renderer instanceof PIXI.CanvasRenderer ? application.renderer.context : application.renderer.gl;
      this.props.onAppInit && this.props.onAppInit.call(this, { canvas, context, options, application });
    },
    onTouchHandle(event) {
      if (this.mainCanvas && event.changedTouches && event.changedTouches.length) {
        console.log('event----->', event);
        this.mainCanvas.dispatchEvent(event);
      }
    }
  }
});
