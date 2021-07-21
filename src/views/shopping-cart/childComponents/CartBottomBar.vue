<template>
  <div class="bottom-bar">
    <div class="bar-button">
      <check-button :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="bar-settlement">
      <div>
        <span>已选{{ checkLength }}件, </span>
        <span>合计：<a>¥ </a></span>
        <span>{{ totalPrice }}</span>
      </div>
      <button @click="calcClick">结算</button>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      let isCheck = this.cartList.filter(item => {
        return item.checked === true
      })
      if (isCheck.length === 0) {
        this.$toast.show('请选择购买的商品')
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !this.cartList.filter(item => !item.checked).length
      return !this.cartList.find(item => !item.checked)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  height: 50px;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
}

.bar-button {
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: 20px;
}

.bar-button span {
  font-size: 14px;
  margin-left: 5px;
  color: #999;
}

.bar-settlement {
  display: flex;
  align-items: center;
}

.bar-settlement div span:nth-child(1) {
  font-size: 14px;
  color: #999;
}

.bar-settlement div span:nth-child(2) {
  font-size: 14px;
}

.bar-settlement div span:nth-child(2) a {
  color: var(--color-tint);
}

.bar-settlement div span:nth-child(3) {
  font-size: 20px;
  color: var(--color-tint);
}

.bar-settlement button {
  background: var(--color-tint);
  border: none;
  border-radius: 15px;
  color: #fff;
  margin: 0 15px;
  padding: 8px 30px;
}

.bar-settlement button:active {
  opacity: .9;
}
</style>
