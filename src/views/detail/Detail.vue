<template>
  <div id='detail'>
    <!-- 吸顶tab栏 -->
    <detail-tab v-show='isTabFixed' ref='topTabControl' :titles=tabTitles class='tabFixed' @tabClick='clickTab'/>
    <!-- 顶部tab栏动画标签 --->
    <transition name="fade">
      <!-- 显示顶部tab栏 -->
      <detail-nav-bar v-if='isShowTab' ref='tabControl' @titleClick="titleClick"/>
      <!--- 显示返回小按钮 --->
      <span v-else class="iconfont back icon-back" @click='back'></span>
    </transition>
    <scroll ref='scroll' :probe-type='3' class='container' @watchScroll='watchScroll'>
      <!-- swiper轮播图组件 -->
      <detail-swiper :top-images='topImages' @SwiperImgLoad='SwiperImgLoad'/>
      <!-- 内容选项组件 -->
      <detail-base-info @rateOffsetTop="rateOffsetTop" :goods='goodsInfo' :shop='ShopInfo'
                        @GoodsImgLoad='GoodsImgLoad'/>
      <!--tab控制栏-->
      <div class='detailInfo-text'>
        <detail-tab ref='botTabControl' :titles=tabTitles style='font-size: 14px;' @tabClick='clickTab'/>
      </div>
      <!-- 商品详情组件-->
      <detail-goods-info ref="details" v-if=show1 :detail-info='detailInfo' @GoodsImgLoad='GoodsImgLoad'/>
      <!-- 规格参数组件 -->
      <detail-param ref="details" v-if=show2 :goodsParam='goodsParam' @mountedParam='GoodsImgLoad'/>
      <!-- 推荐模块 -->
      <div class="recommended" ref="recommend">
        <p>更多推荐</p>
        <goods-list :goods="recommended"/>
      </div>
    </scroll>
    <!-- 底部购买组件-->
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- 返回顶部按钮组件 -->
    <back-top v-show='isShowBackTop' @click.native='backTop'/>
  </div>
</template>
<script>
import DetailNavBar from "./childComponents/DetailNavBar"
import DetailSwiper from "./childComponents/DetailSwiper"
import DetailBaseInfo from "./childComponents/DetailBaseInfo"
import DetailBottomBar from "./childComponents/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll"
import DetailTab from "components/content/tabControl/DetailTab"
import DetailGoodsInfo from "components/content/DetailBaseInfo/DetailGoodsInfo"
import DetailParam from "components/content/DetailBaseInfo/DetailParam"
import GoodsList from "components/content/goods/GoodsList"

import {getDetail, getRecomment, GoodsInfo, GoodsParam, Shop} from "network/detail"
import {backTopMixin} from "utils/mixin"

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailBottomBar,
    Scroll,
    DetailTab,
    DetailGoodsInfo,
    DetailParam,
    GoodsList,
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
      show2: false,
      //推荐商品数据
      recommended: [],
      //组件中评论组件距离顶部的距离
      rateTop: 0,
      //跟踪tab栏的组件距离顶部位置的数组
      themeTopYs: [],
      //tab栏选中的标志
      currentTab: null,
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
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
    //3.获取推荐商品参数
    getRecomment().then(res => {
      this.recommended = res.data.list
    })
  },
  updated() {
    this.themeTopYs = []

    this.themeTopYs.push(0)
    this.themeTopYs.push(this.rateTop)
    this.themeTopYs.push(this.$refs.details.$el.offsetTop - 90)
    this.themeTopYs.push(this.$refs.recommend.offsetTop - 90)
    this.themeTopYs.push(Infinity)
  },
  methods: {
    ...mapActions(['addCart']),
    //回到上一级
    back() {
      this.$router.back()
    },
    //监听滚动方法 显示回到顶部按钮
    watchScroll(position) {
      //1.返回顶部按钮大于-1000时显示
      this.watchBackTop(position)

      //2.tab栏大于多少时显示
      this.isShowTab = -position.y > 80

      //3.判断tabControl栏是否吸顶(position:fixed)
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop

      //4. 获取滚动y值 动态tab栏
      const Y = Math.abs(position.y)

      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentTab !== i && (Y >= this.themeTopYs[i] && Y < this.themeTopYs[i + 1])) {
          this.currentTab = i
          if (this.$refs.tabControl !== undefined) {
            this.$refs.tabControl.currentIndex = this.currentTab
          }
        }
        // if (this.currentTab !== i && ((i < length - 1 && Y >= this.themeTopYs[i] && Y < this.themeTopYs[i + 1]) || (i === length - 1 && Y >= this.themeTopYs[i]))) {
        //   this.currentTab = i
        //   this.$refs.tabControl.currentIndex = this.currentTab
        // }
      }
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
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 800)
    },
    //获取组件中评论组件距离顶部的距离
    rateOffsetTop(index) {
      this.rateTop = index
    },
    //顶部跟踪tab栏
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 800)
    },
    //加入购物车按钮
    addToCart() {
      // 1.获取购物车需要展示的商品信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.shopName = this.ShopInfo.name

      // 2.将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.addCart(product).then(res => {
        // 3.添加购物车成功弹出Toast框
        this.$toast.show(res)
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   // 3.添加购物车成功弹出Toast框
      //   console.log(res)
      // })
    },
  },
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

.recommended {
  background-color: #fff;
  margin-top: 10px;
  padding: 15px 0 0;
  border-radius: 15px;
}

.recommended p {
  font-size: 15px;
  margin: 5px 20px;
  color: var(--color-tint);
}
</style>
