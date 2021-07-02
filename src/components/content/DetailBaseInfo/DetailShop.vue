<template>
  <detail-bg v-if='shop'>
    <div class='shop-head'>
      <img :src='shop.logo' alt=''>
      <span>{{ shop.name }}</span>
    </div>
    <div class='shop-score'>
      <p v-for='item in shop.score'>{{ item.name }}:
        <span :class="item.score > 4.9 ? 'height' : 'low'">{{ item.score }}</span>
      </p>
    </div>
    <div class='shop-iteminfo'>
      <div class='shop-item item1'>
        <span>{{ shop.fans }}</span>
        <p>粉丝人数</p>
      </div>
      <div class='shop-item'>
        <span>{{ shop.goodsCount }}</span>
        <p>全部商品</p>
      </div>
    </div>
  </detail-bg>
</template>
<script>
import DetailBg from "./DetailBg"

export default {
  name: "DetailShop",
  components: {
    DetailBg
  },
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .shop-head img {
    width: 55px;
    height: 55px;
  }

  .shop-head span {
    position: relative;
    bottom: 20px;
    left: 20px;
    font-size: 15px;
    color: var(--color-tint);
  }

  .shop-score {
    margin: 10px 0;
    display: flex;
    text-align: center;
  }

  .shop-score p {
    flex: 1;
    font-size: 13px;
    color: var(--color-text);
  }

  .shop-score p > span {
    font-size: 15px;
  }

  .shop-iteminfo {
    margin: 20px 0 10px 0;
    display: flex;
  }

  .shop-iteminfo .shop-item {
    flex: 1;
    text-align: center;
    font-size: 13px;
    color: #999;
  }

  .item1 {
    border-right: 1px solid #ccc;
  }

  .shop-iteminfo .shop-item span {
    display: block;
    font-size: 18px;
    color: var(--color-text);
    margin-bottom: 5px;
  }

  .height {
    color: var(--color-tint);
    font-size: 16px !important;
  }

  .low {
    color: #55a532;
  }
</style>
