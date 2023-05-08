

const pages = [
  {
    title: "PixiScroll 动画",
    page: "/pages/pixiScroller/pixiScroller"
  },
  {
    title: "骨骼动画--Spine",
    page: "/pages/pixidragon/pixidragon"
  },
  {
    title: "骨骼动画2--Spine",
    page: "/pages/pixidragon2/pixidragon2"
  },
  {
    title: "骨骼动画--DragonBones",
    page: "/pages/pixidragon3/pixidragon3"
  },
  {
    title: "层级调整--layers",
    page: "/pages/pixilayers/pixilayers"
  },
  {
    title: "变色--mask",
    page: "/pages/pixi_shangse/pixi_shangse"
  },

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
