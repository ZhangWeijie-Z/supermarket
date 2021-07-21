<template>
  <div id='base'>
    <!-- 第一部分：价格与详细内容 -->
    <detail-price :goods='goods' />
    <!-- 第二部分：服务选择区域 -->
    <detail-choose :goods='goods' />
    <!-- 第三部分：评论区域 -->
    <detail-rate :goods='goods' ref="rate" />
    <!-- 第四部分：商家信息区域 -->
    <detail-shop :shop='shop' />
  </div>
</template>
<script>
import DetailPrice from "components/content/DetailBaseInfo/DetailPrice"
import DetailChoose from "components/content/DetailBaseInfo/DetailChoose"
import DetailRate from "components/content/DetailBaseInfo/DetailRate"
import DetailShop from "components/content/DetailBaseInfo/DetailShop"

export default {
  name: "DetailBaseInfo",
  components: {
    DetailPrice,
    DetailChoose,
    DetailRate,
    DetailShop
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    },
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  updated() {
    this.$emit('rateOffsetTop', this.$refs.rate.$el.offsetTop - 45)
  }
}
</script>
<style scoped>
</style>
