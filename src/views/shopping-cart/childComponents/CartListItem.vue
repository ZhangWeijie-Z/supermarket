<template>
  <div class="cartItem">
    <p @click="itemClick">{{ product.shopName }}</p>
    <div class="itemCon">
      <div class="item-left">
        <check-button :is-checked="product.checked" @click.native="checkClick"/>
      </div>
      <div class="item-center">
        <a href="javascript:" @click="itemClick">
          <img :src=product.image alt="">
        </a>
      </div>
      <div class="item-right">
        <span @click="itemClick">{{ product.title }}</span>
        <span @click="itemClick">{{ product.desc }}</span>
        <span @click="itemClick"><a>¥ </a>{{ product.price }}</span>
        <div class="add">
          <button @click="product.count --" :class="{BAN:product.count === 1}" :disabled="product.count === 1">-
          </button>
          <span>{{ product.count }}</span>
          <button @click="product.count ++">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      addShow: true
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    },
    itemClick() {
      this.$router.push('/detail/' + this.product.iid)
    }
  },
}
</script>

<style scoped>
.cartItem {
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  box-sizing: border-box;
}

.cartItem p {
  margin-bottom: 10px;
  color: #616161;
  font-weight: 700;
}

.itemCon {
  display: flex;
}

.item-left {
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}

.item-center {
  flex: 3.5;
  height: 120px;
  overflow: hidden;
  border-radius: 15px;
}

.item-center img {
  width: 100%;
  height: 180px;
}

.item-right {
  flex: 5.5;
  position: relative;
  margin-left: 10px;
}

.item-right span {
  display: block;
  font-size: 16px;
  display: -webkit-box; /*将对象转为弹性盒模型展示*/
  -webkit-box-orient: vertical; /*设置弹性盒模型子元素的排列方式*/
  -webkit-line-clamp: 2; /*限制文本行数*/
  overflow: hidden;
  margin-bottom: 15px;
}

.item-right span:nth-child(2) {
  font-size: 12px;
  -webkit-line-clamp: 1; /*限制文本行数*/
  color: #999;
}

.item-right span:nth-child(3) {
  font-size: 20px;
  color: var(--color-tint);
  position: absolute;
  margin: 0;
  bottom: 0;
}

.item-right a {
  font-size: 14px;
  color: var(--color-tint);
}

.item-right span:nth-child(4) {
  position: absolute;
  margin: 0;
  bottom: 0;
  right: 0;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
}

.add {
  position: absolute;
  margin: 0;
  bottom: 0;
  right: 0;
  font-size: 17px;
  display: flex;
  align-items: center;
}

.add span {
  padding: 3px 15px !important;
  margin: 0 !important;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.add button {
  border: none;
  background-color: #fff;
  padding: 5px 10px;
  color: var(--color-tint);
}

.BAN {
  color: #dbdbdb !important;
}
</style>
