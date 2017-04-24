<template>
  <div id="Login">
    <div class="head"><img  src="../assets/logo.png"></div>
    <form v-model="loginInfo">
      <mt-cell>
        <input type="number" placeholder="用户名/昵称" v-model="loginInfo.tel" id="tel" style="border-radius: 0;border: 0;flex: 1;outline: 0;line-height: 1.6;font-size: inherit;width: 100%;">
        <img slot="icon" src="../assets/logo.png" width="24" height="24">
      </mt-cell>
      <mt-cell>
        <input type="password" placeholder="密码" v-model="loginInfo.pwd" id="pwd" style="border-radius: 0;border: 0;flex: 1;outline: 0;line-height: 1.6;font-size: inherit;width: 100%;">
        <img slot="icon" src="../assets/logo.png" width="24" height="24">
      </mt-cell>
    </form>
    <div class="btnpadding"><mt-button  @click="loginUp" id="btn"  type="default" size="large">登录</mt-button></div>
  </div>
</template>
<script>
  //  接口插件
  import Axios from 'axios'
  //  设置接口url
  Axios.defaults.baseURL = 'http://192.168.1.8:8700/rygmkKMb9x';
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  //必写开头
  export default {
    data(){
        return{
          loginInfo:{}
        }
    },
    //页面渲染时
    mounted:function(){
      localStorage.clear();
    },
  //写不需要缓存的函数
    methods:{
      loginUp:function () {
        var that = this;
        Axios.post('/v1/account/login',{
          account:that.loginInfo.tel,
          password:that.loginInfo.pwd
        })
          .then(function (data){
            console.log(data);
            if(data.data.status == 200){
                MessageBox({
                  title:'',
                  message: '登录成功',
                }).then(action => {
                  localStorage.token = data.data.data.user.token;
                  window.history.go(-1);
                });
            }else{
                Toast('账号密码有误');
            }
          });
      },
    }
  }

</script>

<style scoped>
  form{
    margin-top: 50px;
    margin-bottom: 30px;
    padding: 0 15px;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
  }
  .btnpadding{
    padding:0 15px;
    box-sizing: border-box;
    width: 100%;
  }
  #btn{
    background: #7f4a88;
    color: #fff;
  }
  .head{
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
</style>
