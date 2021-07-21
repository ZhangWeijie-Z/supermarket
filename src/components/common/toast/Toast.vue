<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration = 1500) {
      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    },
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .6);
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  z-index: 999;
}
</style>
