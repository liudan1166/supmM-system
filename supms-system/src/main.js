import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';            // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
import App from './App.vue';//引入顶级组件
import router from './router';//引入路由
import '@/styles/common.less';;//引入公共样式

// 注册使用elementui
Vue.use(ElementUI);
// 将axios挂在Vue原型上
Vue.prototype.axios = axios;

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const token = window.localStorage.getItem('token');
  // 有token
  if (token) {
    // 直接放行
    next();
  } else {  // 否则是没有
    // 如果去的是登录页
    if (to.path === '/login') {
      // 直接放行
      next();
    } else {
      // 跳转到登录页
      return next({"path": "/login"})
    }
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
