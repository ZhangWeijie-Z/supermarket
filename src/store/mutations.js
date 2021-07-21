import {ADD_COUNT, ADD_TO_CART} from "./mutations-types";

export default {
  //actions判断 如果数组里有相同iid 让其count+1
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  //actions判断 如果数组中没有相同iid 添加进数组
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.unshift(payload)
  }
}
