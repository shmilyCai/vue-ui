<template>
  <div class="nav">
    <el-menu
      :default-openeds="[]"
      default-active="1"
      class="el-menu-vertical-demo"
    
      route="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">
           <router-link to="/">Dashboar</router-link>
        </span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-message"></i>系统管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link to="/user">用户管理</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/role">角色管理</router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <router-link to="/">Home</router-link>
          </el-menu-item>
          <el-menu-item index="1-4">
            <router-link to="/about">about</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav {
  a {
    height: 100%;
    color: #ffffff;
    text-decoration: none;
    &:hover {
      text-decoration: none;
      color: #ffd04b;
    }
  }
}
.el-menu {
  height: calc(100% - 60px);
}
</style>
