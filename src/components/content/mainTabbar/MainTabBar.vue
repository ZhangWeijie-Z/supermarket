<template>
  <tab-bar>
    <tab-bar-item path='/home'>
      <span slot='item-icon' class="iconfont homepage icon-homepage"></span>
      <span slot='item-icon-active' class="iconfont homepage_fill icon-homepage_fill"></span>
      <div slot='item-text'>首页</div>
    </tab-bar-item>
    <tab-bar-item path='/category'>
      <span slot='item-icon' class="iconfont qrcode icon-qrcode"></span>
      <span slot='item-icon-active' class="iconfont qrcode icon-qrcode_fill"></span>
      <div slot='item-text'>分类</div>
    </tab-bar-item>
    <tab-bar-item path='/ShoppingCart'>
      <span slot='item-icon' class="iconfont publish goods_fill icon-publishgoods_fill"></span>
      <span slot='item-icon-active' class="iconfont publish goods_fill icon-publishgoods_fill"></span>
      <div slot='item-text'>购物车</div>
    </tab-bar-item>
    <tab-bar-item path='/profile'>
      <span slot='item-icon' class="iconfont people icon-people"></span>
      <span slot='item-icon-active' class="iconfont people icon-people_fill"></span>
      <div slot='item-text'>我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem from "components/common/tabbar/TabBarItem"

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped>
</style>
