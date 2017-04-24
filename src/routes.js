/**
 * Created by Administrator on 2017/3/27.
 */


// 导入我们要跳转的膜版页面
import articleList from './components/JumpArticleList.vue'
import articleInfo from './components/JumpArticleInfo.vue'
import Login from './components/JumpLogin.vue'
import writeArticle from './components/JumpWriteArticle.vue'
// 定义路由集合
const routes =[
  {
    name:'articleList',
    path:'/',
    component:articleList,
  },
  {
    name:'articleInfo',
    path:'/articleInfo',
    component:articleInfo
  },
  {
    name:'Login',
    path:'/Login',
    component:Login
  },
  {
    name:'writeArticle',
    path:'/writeArticle',
    component:writeArticle
  }
];


export default routes
