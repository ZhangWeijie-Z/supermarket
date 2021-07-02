<template>
  <detail-bg v-if='goods'>
    <div class='base-info-choose'>
      <ul>
        <li>
            <span class="content-left">
              选择
            </span>
          <span class="content-center">
              颜色分类/尺码
            </span>
          <span class="iconfont back icon-back content-right"></span>
        </li>
        <li>
            <span class="content-left">
              发货
            </span>
          <span class="content-center">
              广东广州
            </span>
          <span class="iconfont back icon-back content-right"></span>
        </li>
        <li>
            <span class="content-left">
              参数
            </span>
          <span class="content-center">
              产品参数/尺码说明
            </span>
          <span class="iconfont back icon-back content-right"></span>
        </li>
        <li>
            <span class="content-left">
              保证
            </span>
          <span class="content-center">
              <span v-for='index in goods.services.length-1'>
                <img :src='goods.services[index-1].icon' alt=''>
                {{ goods.services[index - 1].name }}
                </span>
            </span>
          <span class="content-right"></span>
        </li>
      </ul>
    </div>
  </detail-bg>
</template>
<script>
import DetailBg from "./DetailBg"

export default {
  name: "DetailPrice",
  components: {
    DetailBg
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .base-info-choose li {
    display: flex;
    margin: 30px 0 0 0;
    font-size: 15px;
  }

  .base-info-choose li:nth-child(1) {
    margin: 0;
  }

  .content-left {
    flex: 2;
    color: #999;
  }

  .content-center {
    flex: 7;
    flex-wrap: wrap;
  }

  .content-center span {
    font-size: 14px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .content-center span img {
    width: 10px;
    height: 10px;
  }
</style>
