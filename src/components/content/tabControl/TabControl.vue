<template>
  <div id='tab-control'>
    <div v-for='(item,index) in titles' :class='{active:index === currentIndex}' class='tab-control-item' @click='tabClick(index)'>
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>
<style scoped>
  #tab-control {
    display: flex;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 16px;
    z-index: 1;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-height-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
