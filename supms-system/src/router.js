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
      path: '/',
      component: () => import("./views/Index/Index.vue"),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import("./views/Home/Home.vue")
        },
        {
          path: '/accountadd',
          name: 'accountadd',
          component: () => import("./views/AccountAdd/AccountAdd.vue")
        },
        {
          path: '/accountmanage',
          name: 'accountmanage',
          component: () => import("./views/AccountManage/AccountManage.vue")
        },
        {
          path: '/passwordmodify',
          name: 'passwordmodify',
          component: () => import("./views/PasswordModify/PasswordModify.vue")
        },
        {
          path: '/goodsadd',
          name: 'goodsadd',
          component: () => import("./views/GoodsAdd/GoodsAdd.vue")
        },
        {
          path: '/goodsmanage',
          name: 'goodsmanage',
          component: () => import("./views/GoodsManage/GoodsManage.vue")
        },
        {
          path: '/salestatistics',
          name: 'salestatistics',
          component: () => import("./views/SaleStatistics/SaleStatistics.vue")
        },
        {
          path: '/StatisticalControl',
          name: 'StatisticalControl',
          component: () => import("./views/StatisticalControl/StatisticalControl.vue")
        },
        {
          path: '/stockcontrol',
          name: 'stockcontrol',
          component: () => import("./views/StockControl/StockControl.vue")
        },
        {
          path: '/stockadd',
          name: 'stockadd',
          component: () => import("./views/StockAdd/StockAdd.vue")
        },
        {
          path: '/salelist',
          name: 'salelist',
          component: () => import("./views/SaleList/SaleList.vue")
        },
        {
          path: '/stockremoval',
          name: 'stockremoval',
          component: () => import("./views/StockRemoval/StockRemoval.vue")
        },
        {
          path: '/salereturn',
          name: 'salereturn',
          component: () => import("./views/SaleReturn/SaleReturn.vue")
        },
        {
          path: '/membermanage',
          name: 'membermanage',
          component: () => import("./views/MemberManage/MemberManage.vue")
        },
        {
          path: '/memberadd',
          name: 'memberadd',
          component: () => import("./views/MemberAdd/MemberAdd.vue")
        },
      ]
    },



  ]
})
