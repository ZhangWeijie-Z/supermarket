<template>
  <div class="cartList">
    <scroll :probe-type='3' class="cartScroll" ref="scroll" @watchScroll='watchScroll'>
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
    </scroll>
    <!-- 返回顶部按钮组件 -->
    <back-top v-show='isShowBackTop' @click.native='backTop'/>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";

import {backTopMixin} from "utils/mixin"

import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  mixins: [backTopMixin],
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
  methods: {
    watchScroll(position) {
      this.watchBackTop(position)
    }
  }
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
