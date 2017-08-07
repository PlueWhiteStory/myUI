<template>
  <div class="my_header">
    <div class="logo">
      <img src="/static/img/logo.png" alt="">
    </div>
    <div class="nav">
      <ul>
        <li @touchend="navClick1(index,$event)" @click='navClick(index,$event)' :class='index==0?"nav_active":""'
            v-for='(item, index) in nav'>
          <a v-text='item.name'></a>
        </li>
      </ul>
      <div>
        <button>修改密码</button>
        <button>注销登陆</button>
      </div>
      <button type="primary" id="navIcon">
        <Icon color="#fff" size="20" type="navicon-round"></Icon>
      </button>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
              nav: [{id: 0, name: '首页'},
                {id: 1, name: '实时调阅'},
                {id: 2, name: '故障管理'},
                {id: 3, name: "缺陷管理"},
                {id: 4, name: '智能管理'},
                {id: 5, name: '通讯监视'},
                {id: 6, name: '模型管理'},
                {id: 7, name: '快捷调阅'}
              ]
            }
        },
        mounted () {

        },

        methods: {
          navClick () {
//            console.log($);
//            $(event.target).parent ().siblings ('li').removeClass ('nav_active');
//            $(event.target).parent ().addClass ('nav_active');
//            this.$emit ('getnavidx', idx);
            this.$message ("click 事件触发");

          },
          navClick1 (idx, event) {
            this.$message("touch 事件触发");
            event.preventDefault();
          }
        }
    }
</script>

<style>
  .my_header{
    width:100%;
  }
  .logo {
    width:100%;
    height:80px;
    background:url("/static/img/logo_bg.png") no-repeat;
    background-size:cover;
  }

  .nav {
    width: 100%;
    height: 30px;
    position:relative;
  }

  .nav > ul {
    width: 100%;
    height: 100%;
    background: #118481;
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
  }

  .my_header .nav > ul > li {
    float: left;
    height: 100%;
    width: 100px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    border-right: 1px solid #555;
    cursor: pointer;
    position: relative;
    font-size: 16px;
  }

  .nav > ul > li > a {
    display: inline-block;
    height: 100%;
    width: 100px;
    color: #fff;
    text-align: center;
    border-right: 1px solid #555;
    cursor: pointer;
  }

  .nav_active {
    background: linear-gradient(to top, #04A29E 0%, #0A5755 100%);
    color: #F8D92F !important;
  }

  .nav > ul > li:hover .nav_group {
    display: block;
  }
  /**/
  #navIcon{
    position: absolute;
    top:0;
    right:20px;
    height: 30px;
    width: 30px;
    background: #118481;
    display:none;
  }

  @media screen and (max-width: 1000px) {
    #navIcon {
      display: block;
    }

    .my_header .nav > ul > li {
      float:none;
      background: #118481;
    }

  }
</style>
