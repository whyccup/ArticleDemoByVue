<template>
  <div id="title">
    <!-- 跳转 -->
    <a v-bind:href="address"></a>
    <span>{{titleName}}</span>
    <img :src="imgURL" @click="shareArticle">
  </div>
</template>


<script>
  import { MessageBox } from 'mint-ui';
  import share from '../img/share.png'

  export default{
    props:['address','titleName'],
    data(){
        return {
            imgURL:''
        }
    },
    mounted:function () {
      this.imgURL = share
    },
    methods:{
      shareArticle:function () {
        MessageBox.alert('<img src="http://tse4.mm.bing.net/th?id=OIP.-k5e_MzXm59NFeHg6dPD-gEsEs&w=208&h=208&c=7&qlt=90&o=4&pid=1.7">', '扫描二维码即可分享');
      }
    }

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
    top: 11px;
    left: 12px;
    width: 11px;
    height: 11px;
    border: 3px solid #fff;
    border-top: 0;
    border-right: 0;
    transform: rotate(45deg);
    vertical-align: middle;
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
