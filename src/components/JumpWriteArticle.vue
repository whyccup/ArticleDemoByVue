<template>
    <div id="writeArticle">
      <div id="title">
        <!-- 跳转 -->
        <a v-bind:href="address"></a>
        <span class="titleName">{{titleName}}</span>
        <img src="../img/logopush.png" @click="postArticle">
      </div>
        <img :src="dataUrl" id="preview" ref="preview" v-if="this.dataUrl==''?false:true">
        <div class="head">
          <input type="text" PLACEHOLDER="请输入标题" v-model="articleTitle" id="articleTitle">
          <img src="../img/camera.png" @click="makeSheetVisible">
          <input type="file" id="addImg" ref="file" style="display: none;" @change="fileChange">
          <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
        </div>
        <div id="content">
          <textarea placeholder="请输入正文" v-model="content" ></textarea>
        </div>
    </div>
</template>
<script>
  import Axios from 'axios'
  //  设置接口url
  Axios.defaults.baseURL = 'http://192.168.1.8:8700/rygmkKMb9x';
  //必写开头
  export default {
    data(){
      return {
        //在template内要写入vue实例的键都要出现在这里
        titleName:'写文章',
        address:'#',
        articleTitle:'',
        content:'',
        actions:[{
            name:'拍照',
            method:''
          },{
            name:'从相册选择',
            method:this.addImg
          }
        ],
        sheetVisible:'',
        dataUrl:''
      }
    },
    //写不需要缓存的函数
    methods: {
      makeSheetVisible:function () {
        this.sheetVisible = true;
      },
      addImg:function () {
        this.$refs.file.click();
      },
      fileChange:function () {
        let files = this.$refs.file.files[0];
        this.imgPreview(files);
      },
      imgPreview (files) {
        let that = this;
        if (/^image/.test(files.type)) {
          // 创建一个reader
          var reader = new FileReader();
          // 将图片将转成 base64 格式
          reader.readAsDataURL(files);
          // 读取成功后的回调
          reader.onloadend = function () {
            that.dataUrl = this.result;
          }
        }
      },
      postArticle:function () {
        let that = this;
        let formData = new FormData();
        formData.append("token", localStorage.token);
        formData.append("title", that.articleTitle);
        formData.append("content", that.content);
        formData.append("cover", that.$refs.file.files[0]);
        Axios.post('/v1/account/article/add',formData)
          .then(function (data) {
            console.log(data);
            if(data.data.status == 200){
              that.$messagebox({
                title:'介父子提醒您',
                message: '文章发表成功了',
              }).then(action => {
                window.history.go(-1);
              });
            }else{
                that.$toast('请填写完您的文章')
            }
          });
      }
    },
    //引入模块
    components:{},
    //生命钩子
    mounted:function () {
      this.sheetVisible = false;
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
  #title .titleName{
    color: #fff;
    font-size: 20px;
    vertical-align: middle;
    margin-left: 42%;
    margin-right: 30%;
  }
  #title img{
    font-size: 0;
    width: 24px;
    height: 22px;
    vertical-align: middle;
  }

  #preview{
    width: 100%;
    height: 180px;
    border: none;
    display:block;
  }
  .head{
    width: 100%;
    border-bottom: 1px dashed rgba(0,0,0,0.3);
    padding: 14px 10px;
    box-sizing: border-box;
    background: #fff;
  }
  .head::after{
    display: block;
    content: '';
    overflow: hidden;
    clear: both;
  }
  .head input{
    border: none;
    font-size: 18px;
    vertical-align: middle;
    float: left;
    width: 90%;
    outline:none;
  }
  .head img{
    width: 27px;
    height:23px;
    vertical-align: middle;
    float: right;
  }
  #content {
    background: #fff;
    height: 480px;
    padding: 14px 10px;
    box-sizing: border-box;
  }
  #content textarea{
    width: 100%!important;
    height:100%!important;
    border:none;
    resize:none;
    outline:none;
    font-size: 15px;
    line-height: 24px;
  }
</style>
