<template>
  <detail-bg v-if='goods'>
    <div class='base-info-rate'>
      <div class='base-info-rate-head'>
        评论({{ goods.rate }})
        <span class="iconfont back icon-back content-right"></span>
      </div>
      <div v-for='lists in goods.rateList' v-if='goods.rateList' class='base-info-rate-rate'>
        <img :src='lists.user.avatar' alt=''>
        <span>{{ lists.user.uname }}</span>
        <p>[{{ lists.style }}]</p>
        <p>{{ lists.content }}</p>
        <button>查看全部评论</button>
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
  .base-info-rate-head {
    display: flex;
    color: var(--color-tint);
  }

  .base-info-rate-rate {
    margin-top: 20px;
  }

  .base-info-rate-rate img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }

  .base-info-rate-rate span {
    font-size: 14px;
    position: relative;
    bottom: 8px;
    left: 10px;
  }

  .base-info-rate-rate p:nth-child(3) {
    color: #999;
    font-size: 12px;
    margin: 5px 0;
  }

  .base-info-rate-rate p:nth-child(4) {
    font-size: 15px;
    margin: 10px 0;
  }

  .base-info-rate button {
    display: block;
    background-color: #fff;
    color: #999;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
    padding: 8px;
    margin: 15px auto 0 auto;
    transition: all .3s;
  }

  .base-info-rate button:active {
    color: var(--color-tint);
    background-color: #f6f6f6;
  }
</style>
