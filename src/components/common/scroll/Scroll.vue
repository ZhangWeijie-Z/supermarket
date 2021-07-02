<template>
  <div ref='Scroll' class='Scroll'>
    <div class='content'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BS from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bs: null,
      data: 30
    }
  },
  mounted() {
    setTimeout(this.initScroll, 1000)
  },
  methods: {
    initScroll() {
      this.bs = new BS(this.$refs.Scroll, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
        scrollY: true,
        scrollbar: true,
        bounce: {
          top: false,
          bottom: true
        }
      })

      //监听滚动事件
      if (this.probeType === 2 || this.probeType === 3) {
        this.bs.on('scroll', position => {
          // console.log(position)
          //发送滚动事件 此处为返回顶部按钮事件
          this.$emit('watchScroll', position)
        })
      }

      //上拉加载事件
      if (this.pullUpLoad === true) {
        this.bs.on('pullingUp', () => {
          // console.log('监听滚动到底部')
          this.$emit('pullUpLoad')
          this.pullingUpHandler()
        })
      }
    },

    //下拉刷出弹出提示 官方事件
    async pullingUpHandler() {
      this.$parent.isPullUpLoad = true

      await this.requestData()

      this.finishPullUp()
      this.refresh()
      this.$parent.isPullUpLoad = false
    },
    async requestData() {
      try {
        const newData = await this.ajaxGet()
        this.data += newData
      } catch (err) {
        // handle err
        console.log(err)
      }
    },
    ajaxGet() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 5000)
      })
    },

    //封装回到顶部方法
    scrollTo(x, y, time = 300) {
      this.bs && this.bs.scrollTo(x, y, time)
    },
    //封装上拉加载完成方法
    finishPullUp() {
      this.bs && this.bs.finishPullUp()
    },
    //封装图片加载完成 refresh方法
    refresh() {
      this.bs && this.bs.refresh()
      // console.log('----------')
    },
    //封装离开home页面时 保存y轴数据
    getScrollY() {
      return this.bs ? this.bs.y : 0
    }
  }
}
</script>
<style scoped>
</style>
