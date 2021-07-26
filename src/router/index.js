import Vue from "vue"
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const ShoppingCart = () => import('views/shopping-cart/ShoppingCart')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/NotFound'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      tx: 1
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      tx: 2
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      tx: 4
    }
  },
  {
    path: '/ShoppingCart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    meta: {
      tx: 3
    }
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: Detail,
    meta: {
      tx: 5
    }
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

export default router
