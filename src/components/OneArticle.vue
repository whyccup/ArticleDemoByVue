<template>
  <div class="articles">
    <div class="title">
      <div class="left">
        <div class="head">
          <img v-bind:src="userAvatar" >
        </div>
        <div class="name">{{todo.user.name}}</div>
        <div class="time">{{time()}}</div>
      </div>
      <div class="right">
        <div class="like"><img src="../img/like.png"><span>32</span></div>
        <div class="watch"><img src="../img/saw.png"><span>540</span></div>
      </div>
    </div>
    <router-link tag="div" :to="{path: '/articleInfo', query: { articleId: this.articleId }}">
      <div class="img">
        <img  @click="saveData(todo)" v-bind:src="article">
      </div>
      <h4 @click="saveData(todo)">{{todo.title}}</h4>
    </router-link>
  </div>
</template>


<script>
  import Moment from 'moment'
  export default{
    data(){
        return{
          //点击
          articleId:this.todo._id
        }
    },
//这里定义组件和外部沟通的变量
    props:['todo'],
//  methods无缓存，结果相同
    methods:{
      time:function(){
          return Moment(this.todo.create_time).format("hh:mm");
      },
      getComment:function () {
        var that = this;
        Axios.get('/v1/query/comment',{
          params:{
            article:that.info._id,
            page:'1',
            limit:'20'
          }
        })
          .then(function (data){
          });
      },
      saveData:function (todo) {
        //点击存值
        sessionStorage.article = JSON.stringify(todo);
      }
    },
//  computed有缓存，结果相同，且发生依赖改变才能改变，如输入发生改变，Date.now()不发生改变
    computed: {
      userAvatar:function () {
          return 'http://192.168.1.8:8700/rygmkKMb9x/'+this.todo.user.avatar
      },
      article:function () {
          return 'http://192.168.1.8:8700/rygmkKMb9x/'+this.todo.cover
      }
    },
//    页面创建时
    created:function () {
      sessionStorage.clear();
    }
//export default 在这停顿
  }

</script>

<style scoped>
  .articles{
    background: #fff;
    width: 100%;
    margin:10px auto;
    padding: 5px 10px;
    box-sizing: border-box;
  }
  .title{
    width:100%;
    margin-bottom: 10px;
    font-size: 0px;
  }
  .title div,span,img{
    display: inline-block;
  }
  .title img,.title span,.title .name,.title .time{
    vertical-align: middle;
  }

  .title .left .head{
    width: 45px;
    height:45px;
  }
  .head img{
    width: 100%;
    height: 100%;
    border-radius: 45px;
  }
  .title .left,.right{
    font-size: 16px;
  }
  .title .left{
    width: 60%;
    text-align: left;
  }
  .name{
    margin-left: 5px;
  }
  .time{
    font-size: 12px;
  }
  .title .right{
    width: 40%;
    text-align: right;
  }
  .title .right span{
    margin: 0px 5px;
    font-size: 12px;
  }
  .img{
    width: 100%;
    height:150px;
  }
  .img img{
    width: 100%;
    height: 100%;
  }
</style>
