<template>
  <div id="articleList">
    <indexHear :titleName="titleName"></indexHear>
    <OneArticle :todo="todo" v-for="todo in todos" :key="todo.id"></OneArticle>
  </div>
</template>

<script>
  //  全局设置在webpack.base.conf.js

  import Axios from 'axios'
  //  设置接口url
  Axios.defaults.baseURL = 'http://192.168.1.8:8700/rygmkKMb9x';
  //  创建Mod标签，写明引入的位置
  import OneArticle from './OneArticle.vue'
  import indexHear from './HearByIndex.vue'


  //  必写开头
  export default {
    //  开始与接口py
    mounted:function () {
          var that = this;
          var limit = 10;
          this.getq(limit);
          window.onscroll = function () {
            var scrollTop = Math.floor(document.body.scrollTop);
            var scrollHeight = document.body.scrollHeight;
            var windowHeight = window.screen.availHeight;
            if (scrollTop + windowHeight == scrollHeight) {
              that.$indicator.open('加载中...');
              setTimeout(function(){
                  that.$indicator.close();
                  //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
                  limit = limit + 10;
                  that.getq(limit);
              },2000);
            }
      };
    },
    methods:{
      getq:function (limit) {
        var that = this;
        Axios.get('/v1/query/article',{
          params:{
            page:'1',
            limit:limit
          }
        })
          .then(function (data){
            that.todos = data.data.data.articles;
          });
      }
    },
    data(){
      return{
        todos: {},
        titleName:'文章列表',
        address:'#',
        imgName:false
      }
    },
//引入模块
    components: {
      OneArticle,indexHear
      }
    }

</script>


