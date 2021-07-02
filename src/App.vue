<template>
  <div id='app'>
    <!--不让组件销毁 exclude 不让商品详细页面keep-alive-->
    <keep-alive exclude='Detail'>
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>
<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar"

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>
<style>
  @import 'assets/css/base.css';
  @import 'assets/font/tabbar/iconfont.css';
  @import 'assets/font/backtop/iconfont.css';
  @import 'assets/font/detail/iconfont.css';
</style>
