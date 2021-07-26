import BackTop from "components/common/backTop/BackTop"

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      //显示回到顶部按钮
      isShowBackTop: false,
    }
  },
  methods: {
    //回到顶部按钮
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    watchBackTop(position) {
      this.isShowBackTop = Math.abs(position.y) > 1000
    }
  }
}
