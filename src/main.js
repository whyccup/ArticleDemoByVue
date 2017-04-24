// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  next();
});

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  router:router,//通过 router 配置参数注入路由// 从而让整个应用都有路由功能
  el: '#app',
  template: '<App/>',
  components: { App },
  render: h => h(App)
});
