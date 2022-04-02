

const pages = [
  {
    title: "PixiScroll 动画",
    page: "/pages/pixiScroller/pixiScroller"
  },
  {
    title: "pixi 游戏",
    page: "/pages/pixigame/pixigame"
  },
  {
    title: "骨骼动画",
    page: "/pages/pixidragon/pixidragon"
  }
]
Page({
  data() {
    return {
      pages
    }
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
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
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  clickNavigation(e) {
    my.navigateTo({
      url: e.currentTarget.dataset.page
    });
  },
});
