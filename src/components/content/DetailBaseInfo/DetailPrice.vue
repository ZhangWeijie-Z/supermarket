<template>
  <detail-bg v-if='goods'>
    <div class='base-info-price'>
      <span><i>¥ </i>{{ goods.realPrice }}</span>
      <!-- 判断有没有值 -->
      <span :class="Object.keys(goods.discount).length === 0 ? 'DN' : '' ">{{ goods.discount }}</span>
      <span>{{ goods.oldPrice }}</span>
    </div>
    <div class='base-info-content'>
      <p>{{ goods.title }}</p>
      <div class='base-info-content-columns'>
        <span v-for='columns in goods.columns'>
          {{ columns }}
        </span>
      </div>
    </div>
  </detail-bg>
</template>
<script>
import DetailBg from "./DetailBg"

export default {
  name: "DetailPrice",
  components: {
    DetailBg
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .base-info-price {
    padding: 10px 0;
    vertical-align: bottom;
  }

  .base-info-price span {
    color: var(--color-tint);
    text-align: center;
  }

  .base-info-price span:first-child {
    font-size: 26px;
  }

  .base-info-price span:first-child i {
    font-size: 18px;
  }

  .base-info-price span:nth-child(2) {
    background-color: #fff;
    border: 1px solid var(--color-tint);
    border-radius: 10px;
    font-size: 14px;
    margin: 0 10px 0 15px;
    padding: 1px 10px;
    position: relative;
    bottom: 4px;
  }

  .base-info-price span:last-child {
    color: #ccc;
    text-decoration: line-through;
  }

  .base-info-content p {
    font-size: 18px;
    line-height: 1.3;
  }

  .base-info-content-columns {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }

  .base-info-content-columns span {
    font-size: 14px;
    color: #999;
  }
</style>
