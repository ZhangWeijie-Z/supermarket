<template>
  <div id="cart">
    <!--  导航栏  --->
    <nav-bar class="cartNavbar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--  购物车无商品页面  -->
    <div class="null" v-show="cartLength === 0">
      <p>购物车还是空的噢，快来挑选好货吧~</p>
      <button @click="goHome">去逛逛</button>
    </div>
    <!--  商品列表  -->
    <cart-list v-show="cartLength !== 0"/>
    <!--  底部列表汇总  -->
    <cart-bottom-bar v-show="cartLength !== 0"/>
  </div>
</template>
<script>
import CartList from "./childComponents/CartList";
import CartBottomBar from "./childComponents/CartBottomBar";

import NavBar from "components/common/navbar/NavBar";

import {mapGetters} from 'vuex'

export default {
  name: "ShoppingCart",
  components: {
    CartList,
    CartBottomBar,
    NavBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
  methods: {
    goHome() {
      this.$router.push('home')
    }
  }
}
</script>
<style scoped>
#cart {
  height: 100vh;
  background-color: #F2F2F2;
}

.cartNavbar {
  background-color: var(--color-tint);
  color: #fff;
}

.null {
  height: 100px;
  text-align: center;
  position: relative;
  top: 40%;
}

.null p {
  font-size: 16px;
}

.null button {
  font-size: 14px;
  padding: 6px 10px;
  margin: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: var(--color-tint);
}
</style>
