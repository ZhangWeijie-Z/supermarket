<template>
  <div id="bottom-bar">
    <div class="bar-left">
      <div>
        <span class="iconfont icon-icon-test"></span>
        <p>客服</p>
      </div>
      <div>
        <span class="iconfont icon-dianpu"></span>
        <p>店铺</p>
      </div>
      <div>
        <span class="iconfont icon-shoucang1"></span>
        <p>收藏</p>
      </div>
    </div>
    <div class="bar-right">
      <button @click="addToCart">加入购物车</button>
      <button>立即购买</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
#bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  background-color: #fff;
  display: flex;
  border-top: 1px solid #eeeeee;
}

.bar-left {
  display: flex;
  text-align: center;
  flex: 4;
  line-height: 1.4;
  margin-top: 3px;
  font-size: 13px;
}

.bar-left div:first-child span {
  color: var(--color-tint);
}

.bar-left span {
  font-size: 18px;
}

.bar-right {
  display: flex;
  flex: 6;
}

.bar-left div {
  flex: 1;
}

.bar-right button {
  flex: 1;
  margin: 5px;
  border-radius: 15px;
  border: none;
  font-size: 15px;
  color: #fff;
}

.bar-right button:active {
  opacity: .9;
}

.bar-right button:first-child {
  background-color: var(--color-tint);
}

.bar-right button:last-child {
  background-color: #fab602;
}
</style>
