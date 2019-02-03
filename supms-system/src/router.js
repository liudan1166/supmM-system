import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("./views/login/login.vue")
    },
    {
      path: '/index',
      component: () => import("./views/index/index.vue"),
      children: [
        {
          path: '/a',
          name: 'accountadd',
          component: () => import("./views/accountAdd/accountAdd.vue")
        }
      ]
    },



  ]
})
