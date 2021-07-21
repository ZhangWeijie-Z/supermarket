<template>
  <div class="cartList">
    <scroll :probe-type='3' class="cartScroll" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item" />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";

import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    if (this.$refs.scroll !== undefined) {
      this.$refs.scroll.refresh()
    }
  },
}
</script>

<style scoped>
.cartList {
  height: calc(100% - 44px - 49px - 50px);
}

.cartScroll {
  height: 100%;
  overflow: hidden;
}
</style>
