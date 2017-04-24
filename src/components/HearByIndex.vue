<template>
  <div id="title">
    <!-- 跳转 -->
    <a @click="jumpLogin"></a>
    <span>{{titleName}}</span>
    <img :src="imgURL" @click="shareArticle">
  </div>
</template>


<script>
  import { MessageBox } from 'mint-ui';
  import write from '../img/write.png'

  export default{
    props:['address','titleName'],
    data(){
      return {
        imgURL:''
      }
    },
    mounted:function () {
      this.imgURL = write
    },
    methods:{
      jumpLogin:function () {
          this.$router.push('Login');
      },
      shareArticle:function () {
        if(localStorage.length == 0){
          MessageBox({
            title: '',
            message: '想发表文章先登录',
            showCancelButton: true,
            confirmButtonText:'去登录'
          }).then(action => {
            this.$router.push('Login');
          });
        }else{
          this.$router.push('writeArticle');
        }
      },
    },


  }
</script>


<style scoped>
  #title{
    width: 100%;
    height: 36px;
    line-height: 36px;
    background: #7f4a88;
    position: relative;
    font-size: 0;
  }
  #title a{
    display: block;
    position: absolute;
    top: 8px;
    left: 12px;
    width: 17px;
    height: 20px;
    vertical-align: middle;
    background: url("../img/center.png");
  }
  #title span{
    color: #fff;
    font-size: 20px;
    vertical-align: middle;
    margin-left: 38%;
    margin-right: 28%;
  }
  #title img{
    font-size: 0;
    width: 22px;
    height: 22px;
    vertical-align: middle;

  }
</style>

