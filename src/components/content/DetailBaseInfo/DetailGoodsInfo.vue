<template>
  <div v-if='Object.keys(detailInfo).length !== 0' class='detailInfo'>
    <!--图文详细信息-->
    <img v-for='(item,index) in detailInfo.detailImage[0].list' :key='index' :src='item' alt='' @load='GoodsImgLoad'>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    goodsParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    GoodsImgLoad() {
      this.$emit('GoodsImgLoad')
    }
  }
}
</script>
<style scoped>
  .detailInfo img {
    width: 100%;
  }
</style>
