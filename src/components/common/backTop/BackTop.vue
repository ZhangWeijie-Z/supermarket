<template>
  <div id='back-top'>
    <span class="iconfont top icon-top"></span>
  </div>
</template>
<script>
export default {
  name: "BackTop"
}
</script>
<style scoped>
  #back-top {
    position: fixed;
    right: 15px;
    bottom: 130px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    z-index: 10;
    color: #fff;
    background-color: var(--color-tint);
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    transition: all .2s;
  }

  #back-top:active {
    color: var(--color-tint);
    background-color: #fff;
  }

  #back-top span {
    font-size: 34px;
  }
</style>
