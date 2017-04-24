import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter);

// 实例化router对象
const router = new VueRouter({
  routes:routes,//挂载路由集合
});

// 导出router对象
export default router
