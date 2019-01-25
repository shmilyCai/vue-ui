import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import User from '../components/User.vue'
import Role from '../components/Role.vue'
import ShoppingCart from '../components/demo/ShoppingCart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/demo',
      name: 'demo',
      component: ShoppingCart
    },
    {
      path: '/role',
      name: 'role',
      component: Role
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})
