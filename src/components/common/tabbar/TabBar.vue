<template>
  <div id='tab-bar'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabBar"
}
</script>
<style scoped>
  #tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
</style>
