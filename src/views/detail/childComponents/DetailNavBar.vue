<template>
  <nav-bar class='detail-nav-bar'>
    <div slot='left' class='nav-left' @click='backClick'>
      <span class="iconfont back icon-back"></span>
    </div>
    <div slot='center' class='nav-title'>
      <div v-for='(item,index) in titles' :class='{active:index === currentIndex}' class='title-item'
        @click='itemClick(index)'>{{ item }}
      </div>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      //navbar标题参数
      titles: ['商品', '评论', '详情', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    //顶部item栏点击切换方法
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    //返回按钮返回方法
    backClick() {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.detail-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: #fff;
}

.nav-left span {
  font-size: 22px;
}

.nav-left:active {
  color: var(--color-tint);
}

.nav-title {
  display: flex;
  font-size: 16px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-tint);
}
</style>
