<template>
  <div id='goods-list-item' @click='itemClick'>
    <img :src='goodsItem.show.img' alt='' @load='imgLoad'>
    <div class='goods-list-item-content'>
      <p>{{ goodsItem.title }}</p>
      <div class='goods-list-item-content-price'>
        ￥<p>{{ goodsItem.price }}</p>
      </div>
      <span>收藏{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>
<style scoped>
  @media screen and (max-width: 321px) {
    .goods-list-item-content span {
      display: none;
    }
  }

  #goods-list-item {
    width: 50%;
    float: left;
    box-sizing: border-box;
    padding: 5px;
    font-weight: 200;
  }

  #goods-list-item img {
    width: 100%;
    height: 71.5vw;
    border-radius: 8px 8px 0 0;
  }

  .goods-list-item-content {
    position: relative;
    margin-top: -4px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
    font-size: 14px;
    padding: 10px;
  }

  .goods-list-item-content > p {
    height: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.4;
    margin-bottom: 5px;
  }

  .goods-list-item-content-price {
    display: flex;
    color: var(--color-height-text);
    align-items: flex-end;
  }

  .goods-list-item-content-price p {
    font-size: 1.15rem;
  }

  .goods-list-item-content span {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 0.8rem;
    text-align: center;
    color: var(--color-height-text);
    background-color: #FFECEF;
    border-radius: 30px;
    padding: 3px 10px;
  }
</style>
