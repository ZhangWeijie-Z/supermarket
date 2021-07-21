<template>
  <div class="check-button">
    <span class="iconfont icon-check2" :class="{check:isChecked}"></span>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>
.check-button span {
  display: block;
  width: 25px;
  height: 25px;
  line-height: 1.9;
  border-radius: 50%;
  border: 2px solid #ccc;
  color: #fff;
  font-size: 12px;
  text-align: center;
}

.check {
  background-color: var(--color-tint);
  border: 2px solid var(--color-tint) !important;
}
</style>
