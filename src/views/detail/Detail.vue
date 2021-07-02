<template>
  <div id='detail'>
    <!-- 吸顶tab栏 -->
    <detail-tab v-show='isTabFixed' ref='topTabControl' :titles=tabTitles class='tabFixed' @tabClick='clickTab' />
    <!-- 顶部tab栏动画标签 --->
    <transition name="fade">
      <!-- 显示顶部tab栏 -->
      <detail-nav-bar v-if='isShowTab' ref='tabControl' />
      <!--- 显示返回小按钮 --->
      <span v-else class="iconfont back icon-back" @click='back'></span>
    </transition>
    <scroll ref='scroll' :probe-type='3' class='container' @watchScroll='watchScroll'>
      <!-- swiper轮播图组件 -->
      <detail-swiper :top-images='topImages' @SwiperImgLoad='SwiperImgLoad' />
      <!-- 内容选项组件 -->
      <detail-base-info :goods='goodsInfo' :shop='ShopInfo' @GoodsImgLoad='GoodsImgLoad' />
      <!--tab控制栏-->
      <div class='detailInfo-text'>
        <detail-tab ref='botTabControl' :titles=tabTitles style='font-size: 14px;' @tabClick='clickTab' />
      </div>
      <!-- 商品详情组件-->
      <detail-goods-info v-if=show1 :detail-info='detailInfo' @GoodsImgLoad='GoodsImgLoad' />
      <!-- 规格参数组件 -->
      <detail-param v-if=show2 :goodsParam='goodsParam' @mountedParam='GoodsImgLoad' />
    </scroll>
    <!-- 返回顶部按钮组件 -->
    <back-top v-show='isShowBackTop' @click.native='backClick' />
  </div>
</template>
<script>
import DetailNavBar from "./childComponents/DetailNavBar"
import DetailSwiper from "./childComponents/DetailSwiper"
import DetailBaseInfo from "./childComponents/DetailBaseInfo"

import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/common/backTop/BackTop"
import DetailTab from "components/content/tabControl/DetailTab"
import DetailGoodsInfo from "components/content/DetailBaseInfo/DetailGoodsInfo"
import DetailParam from "components/content/DetailBaseInfo/DetailParam"

import {getDetail, GoodsInfo, Shop, GoodsParam} from "network/detail"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    BackTop,
    DetailTab,
    DetailGoodsInfo,
    DetailParam
  },
  data() {
    return {
      //获取到商品的iid
      iid: null,
      //获取轮播图片
      topImages: [],
      //获取所有商品信息 整合所有数据 面向对象
      goodsInfo: null,
      //获取商家信息
      ShopInfo: null,
      //获取详情图片信息
      detailInfo: {},
      //获取详细参数信息
      goodsParam: {},
      //显示顶部tab栏
      isShowTab: false,
      //显示回到顶部按钮
      isShowBackTop: false,
      //tabControl
      tabTitles: ['图文详情', '规格参数'],
      //判断tab距离顶部距离
      tabOffsetTop: 0,
      //判断是否吸顶
      isTabFixed: false,
      //判断tab栏
      tabCurrent: 0,
      //tab栏显示显示详细信息
      show1: true,
      //tab栏显示参数信息
      show2: false
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result
      //1.获取轮播图数据
      this.topImages = data.itemInfo.topImages

      //2.获取所有商品信息
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services, data.rate)

      //3.获取商家信息
      this.ShopInfo = new Shop(data.shopInfo)

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      //5.获取详细参数信息
      this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })
  },
  methods: {
    //回到上一级
    back() {
      this.$router.back()
    },
    //回到顶部按钮
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    //监听滚动方法 显示回到顶部按钮
    watchScroll(position) {
      //1.返回顶部按钮大于-1000时显示
      this.isShowBackTop = Math.abs(position.y) > 1000

      //2.tab栏大于多少时显示
      this.isShowTab = -position.y > 80

      //3.判断tabControl栏是否吸顶(position:fixed)
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    //轮播图加载完成计算高度
    SwiperImgLoad() {
      this.tabOffsetTop = this.$refs.botTabControl.$el.offsetTop - 44
    },
    //监听图片详细信息加载完成 重新刷新
    GoodsImgLoad() {
      this.$refs.scroll.refresh()
    },
    //点击切换tab栏
    clickTab(index) {
      switch (index) {
        case 0:
          this.show1 = true
          this.show2 = false
          break
        case 1:
          this.show1 = false
          this.show2 = true
          break
      }
      this.$refs.topTabControl.tabCurrent = index
      this.$refs.botTabControl.tabCurrent = index
    }
  }
}
</script>
<style scoped>
  .tabFixed {
    position: relative;
    top: 44px;
    font-size: 14px !important;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
  }

  #detail {
    height: 100vh;
    background-color: #F2F2F2;
    position: relative;
    z-index: 11;
  }

  .iconfont {
    position: absolute;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    top: 4px;
    left: 12px;
    z-index: 1;
    font-size: 20px;
    color: #fff;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 30px;
  }

  .container {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .detailInfo-text {
    padding-top: 5px;
    border-radius: 15px 15px 0 0;
    background-color: #fff;
  }
</style>
