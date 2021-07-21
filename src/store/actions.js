import {ADD_COUNT, ADD_TO_CART} from "./mutations-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // console.log(payload)
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNT, oldProduct)
        resolve('购物车数量加1~')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('加入购物车成功~')
      }
    })

  }
}
