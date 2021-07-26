<template>
  <div :style='activeStyle' class='tab-bar-item' @click='itemClick'>
    <div v-if='isShow'>
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <slot name='item-text'></slot>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'pink'
    }
  },
  computed: {
    isShow() {
      //indexOf返回对应的索引，找不到则返回-1
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isShow ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>
<style scoped>
.tab-bar-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  height: 49px;
  box-sizing: border-box;
  padding-top: 3px;
  font-size: 15px;
}

.tab-bar-item > div span {
  flex: 1;
  font-size: 22px;
}
</style>
