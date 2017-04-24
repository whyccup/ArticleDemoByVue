<template>
  <div class="commentText">
    <div class="commentUser">
      <div class="user">
        <div class="img"><img :src="userAvatar"></div>
        <div class="userNameAndTime">
          <div class="userName">{{comment.user.name}}</div>
          <div class="userTime">{{time()}}</div>
        </div>
      </div>
      <div class="like"><img src="../img/like.png"><span>32</span></div>
    </div>
    <div class="userComment">{{comment.content}}</div>
  </div>
</template>

<script>
  import Moment from 'moment'
  export default{
    props:['comment'],
    methods:{
      time:function(){
        return Moment(this.comment.create_time).format("hh: mm");
      }
    },
    computed: {
      userAvatar:function () {
        return 'http://192.168.1.8:8700/rygmkKMb9x/'+this.comment.user.avatar
      },
    },
    //export default 在这停顿
  }
</script>

<style scoped>
  .commentText{
    padding: 15px 10px;
    background: #fff;
    box-sizing: border-box;
  }
  .commentUser{
    font-size: 0;
    margin-bottom: 15px;
  }
  .commentUser div{
    display: inline-block;
    vertical-align: middle;
  }
  .user{
    width: 70%;
    text-align: left;
  }
  .like{
    width: 30%;
    text-align: right;
    font-size: 16px;
  }
  .like img{
    vertical-align: middle;
  }
  .like span{
    margin-left: 5px;
    vertical-align: middle;
  }
  .img{
    width: 45px;
    height:45px;
    margin-right: 10px;
  }
  .img img{
    width: 100%;
    height: 100%;
    border-radius: 45px;
  }
  .userNameAndTime{
    font-size: 16px;
    padding-left: 5px;
    box-sizing: border-box;
  }
  .userNameAndTime .userName{
    width: 100%;
  }
  .userNameAndTime .userTime{
    font-size: 12px;
  }
  .userComment{
    font-size: 16px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
</style>



