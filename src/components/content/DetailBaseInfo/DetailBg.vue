<template>
  <div class='base-info'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DetailBg"
}
</script>
<style scoped>
  .base-info {
    padding: 15px 15px;
    margin: 10px;
    background-color: #fff;
    border-radius: 15px;
  }
</style>
