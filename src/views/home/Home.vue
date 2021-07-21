<template>
  <div id='home'>
    <!-- 导航栏 -->
    <nav-bar class='home-navbar'>
      <div slot='center'>购物街</div>
    </nav-bar>
    <!-- 吸顶tab控制栏-->
    <tab-control v-show='isTabFixed' ref='topTabControl' :titles=titles class='tab-control' @tabClick='tabClick' />
    <!-- 使用封装的better-scroll组件-->
    <scroll ref='scroll' :probe-type='3' :pull-up-load='true' class='container' @pullUpLoad='loadMore'
      @watchScroll='watchScroll'>
      <!-- banner横幅图 -->
      <home-swiper :banners='banners' @SwiperImgLoad='SwiperImgLoad' />
      <!-- 推荐列表 -->
      <home-recommend :recommend='recommends' />
      <!-- 功能列表 -->
      <home-feature />
      <!-- tab控制栏-->
      <tab-control ref='tabControl' :titles=titles @tabClick='tabClick' />
      <!-- goods列表 -->
      <goods-list :goods=showGoods />
      <!-- 下拉字体提示 -->
      <div class="pullup-tips">
        <div v-show="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">下拉加载更多</span>
        </div>
        <div v-show="isPullUpLoad" class="after-trigger">
          <span class="pullup-txt">加载中~~</span>
        </div>
      </div>
    </scroll>
    <!-- 返回顶部按钮组件 -->
    <back-top v-show='isShowBackTop' @click.native='backTop' />
  </div>
</template>
<script>
import HomeSwiper from "./childComponents/HomeSwiper"
import HomeRecommend from "./childComponents/HomeRecommend"
import HomeFeature from "./childComponents/HomeFeature"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"

import {getHomeGoods, getHomeMultidata} from "network/home"
import {debounce} from "utils/utils"
import {backTopMixin} from "utils/mixin";

export default {
  name: "Home",
  mixins: [backTopMixin],
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      //banners横幅数组存放地
      banners: [],
      //四张小圆图片数组存放地
      recommends: [],
      //商品列表
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      //tabControl默认选中pop
      currentType: 'pop',
      //判断下拉显示的提示字显示状态
      isPullUpLoad: false,
      //初始化tabControl距离顶部位置
      tabOffsetTop: 0,
      //tabControl是否吸顶
      isTabFixed: false,
      //离开home页面 记录滚动的位置
      saveY: 0,
      //保存tab栏的数据
      titles: ['流行', '新款', '精选']
    }
  },
  computed: {
    //返回goods.currentType.list 数据
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求横幅图片和建议模块数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //1.监听item中图片加载完成 事件总线 $bus.$emit
    //使用debounce防抖函数 图片加载完成调用
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    //事件监听相关方法
    //Home Tab栏切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //让吸顶tab和普通tab切换之后的currentIndex保持一致
      this.$refs.tabControl.currentIndex = index
      this.$refs.topTabControl.currentIndex = index
    },
    //监听滚动方法 显示回到顶部按钮
    watchScroll(position) {
      //1.返回顶部按钮大于-1000时显示
      this.watchBackTop(position)

      //2.判断tabControl栏是否吸顶(position:fixed)
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    //获取tabControl的OffsetTop值 赋值给tabControl
    SwiperImgLoad() {
      //所有组件都有一个属性$el,用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

    //网络请求相关方法
    //请求横幅图片和建议模块数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //onCompleted onRejected
        //console.log(res)
        let com = res.data
        this.banners = com.banner.list
        this.recommends = com.recommend.list
      })
    },
    //请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //调用完成上拉刷新
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  //keep-alive组件激活时调用
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  //keep-alive组件离开时调用
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.tab-control {
  position: relative;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .2);
}

.home-navbar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}

.container {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.pullup-tips {
  display: block;
  padding: 20px;
  text-align: center;
  color: var(--color-tint);
}
</style>
