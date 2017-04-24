<template>
  <div id="articleInfo">
    <!--四、写自定义组件标签并加上要传的值得属性-->
    <indexHear :address="address" :titleName="titleName"></indexHear>
    <div class="articles">
      <div class="articles-title">
        <div class="left">
          <div class="head">
            <img :src="userAvatar">
          </div>
          <div class="name">{{info.user.name}}</div>
          <div class="time">{{time()}}</div>
        </div>
        <div class="right">
          <div class="like"><img src="../img/like.png"><span>32</span></div>
          <div class="watch"><img src="../img/saw.png"><span>540</span></div>
        </div>
      </div>
      <h4>{{info.title}}</h4>
      <div class="img" @click="oneQRCode()">
        <img :src="article">
      </div>
      <div id="articleText">
        <p>{{info.content}}</p>
      </div>
    </div>
    <div class="comment-title">
      评论({{commentsLength}})
    </div>
    <div id="comment" v-if="clear">
      <commentText :comment="comment" v-for="comment in comments" :key="comment.id"></commentText>
      <!--评论组件-->
    </div>
    <div class="noComment" v-else>
      还没有人评论呢
    </div>
    <div class="writeComment">
      <input  v-model="commentContent" type="text" placeholder="写评论......">
      <img src="../img/push.png" @click="jumpLogin">
    </div>
  </div>
</template>

<script>
  //  接口插件
  import Axios from 'axios'
  //  设置接口url
  Axios.defaults.baseURL = 'http://192.168.1.8:8700/rygmkKMb9x';

  //一、定义组件名字并引入
  import Moment from 'moment'
  import indexHear from './HearByShare.vue'
  import commentText from './commentText.vue'
  import { MessageBox } from 'mint-ui';
  //二、在data里写组件要用到的数据
  export default{
    data(){
      return{
        titleName:'文章详情',
        address:'#',
        imgName:true,
        info:'',
        comments:{},
        commentsLength:this.commentsLength,
        commentContent:''
      }
    },
//三、注册组件
    components:{
      indexHear,commentText
    },
    methods:{
      time:function(){
        return Moment(this.info.create_time).format("hh:mm");
      },
      getComment:function () {
        var that = this;
        Axios.get('/v1/query/comment',{
          params:{
            article:that.info._id,
            page:'1',
            limit:'100'
          }
        })
          .then(function (data){
            console.log(data);
            that.comments = data.data.data.comments;
            that.commentsLength = data.data.data.comments.length;
          });
      },
      jumpLogin:function () {
          if(localStorage.length == 0){
              MessageBox({
                title: '',
                message: '你还没登录呢',
                showCancelButton: true,
                confirmButtonText:'去登录'
              }).then(action => {
              this.$router.push('Login');
            });
          }else{
            this.addComment();
          }
      },
      addComment:function () {
        var that = this;
        Axios.post('/v1/account/comment/add',{
          token:localStorage.token,
          article:that.info._id,
          content:that.commentContent
        })
          .then(function (data){
            if(data.data.message == '请求参数有误'){
              that.$toast({
                message: '评论不能为空的',
                position: 'bottom',
                duration: 1000
              })
            }else if(data.data.message == '评论不能重复'){
              that.$toast({
                message: data.data.message,
                position: 'bottom',
                duration: 1000
              });
            }else{
              MessageBox({
                title:'',
                message:'评论成功'
              }).then(action => {
                window.history.go(0);
              });
            }
          });
      },
    },
    computed:{
      userAvatar:function () {
        return 'http://192.168.1.8:8700/rygmkKMb9x/'+this.info.user.avatar
      },
      article:function () {
        return 'http://192.168.1.8:8700/rygmkKMb9x/'+this.info.cover
      },
      clear:function () {
        if(this.commentsLength == 0){
            return false
        }else{
            return true
        }
      }
    },
    //给vue上的自定义属性赋值时最好在created时，此时未进行任何挂载
    created:function () {
    //不要从路由中拿东西
      this.info = JSON.parse(sessionStorage.article);
      this.getComment();
    }
  }

</script>

<style scoped>
  #comment{
    width: 100%;
    padding-bottom: 30px;
    background: #fff;
  }
  .noComment{
    width: 100%;
    padding: 10px;
    opacity: 0.7;
    color: #000;
    text-align: center;
    margin-bottom: 75px;
    box-sizing: border-box;
  }
  .articles{
    background: #fff;
    width: 100%;
    padding: 15px 10px;
    box-sizing: border-box;
  }
  .articles-title{
    width:100%;
    margin-bottom: 10px;
    font-size: 0px;
  }
  .articles-title div,span,img{
    display: inline-block;
  }
  .articles-title img,.articles-title span,.articles-title .name,.articles-title .time{
    vertical-align: middle;
  }
  .articles-title .left .head{
    width: 45px;
    height:45px;
  }
  .head img{
    width: 100%;
    height: 100%;
    border-radius: 45px;
  }
  .articles-title .left,.right{
    font-size: 16px;
  }
  .articles-title .left{
    text-align: left;
    width: 60%;
  }
  .name{
    margin-left: 5px;
  }
  .time{
    font-size: 12px;
  }
  .articles-title .right{
    text-align: right;
    width: 40%;
  }
  .articles-title .right span{
    margin: 0px 5px;
    font-size: 12px;
  }
  h4{
    margin-top:20px;
    margin-bottom:15px;
  }
  .img{
    width: 100%;
    height:150px;
  }
  .img img{
    width: 100%;
    height: 100%;
  }
  #articleText p{
    margin-top:15px;
    margin-bottom:0px;
    font-size: 15px;
    line-height: 24px;
    text-indent: 2em;
  }
  .comment-title{
    padding: 14px 10px;
    font-size: 16px;
  }
  .writeComment{
    position: fixed;
    bottom:0;
    padding: 0 10px;
    padding-top: 8px;
    padding-bottom: 13px;
    box-sizing: border-box;
    box-shadow: 0 0 8px rgba(0,0,0,0.4);
    background: #fff;
    width: 100%;
  }
  .writeComment input {
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 90%;
    height: 28px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .writeComment input:focus {
    outline: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .writeComment img{
   vertical-align: middle;
  }
</style>





