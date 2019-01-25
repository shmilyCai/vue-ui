<template>
  <div id="app">
    <el-container>
      <el-aside style="width:200px;height:100%;background-color:#545c64;">
        <div class="logo">
          <img alt="logo" src="./assets/logo_cai.png" width="100%">
        </div>
        <Nav></Nav>
      </el-aside>
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
          <Content/>
        </el-main>
      </el-container>
    </el-container>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Nav from "./section/Nav.vue";
import Header from "./section/Header.vue";
import Content from "./section/Content.vue";
import ShoppingCart from './components/demo/ShoppingCart.vue'

export default {
  name: "app",
  components: {
    HelloWorld,
    Nav,
    Header,
    Content,
    ShoppingCart,
  }
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  color: #2c3e50;
}
.nav {
  /* width: "200px";
  background: #2c3e50; */
  color: #ffffff;
}
.el-header {
  border-bottom: solid 1px #e6e6e6;
}
.logo {
  height: 60px;
  text-align: center;
  line-height: 60px;
  padding: 0 10px;
}
</style>
