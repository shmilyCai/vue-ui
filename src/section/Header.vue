<template>
  <div class="header">
    <span class="pull-right p-t-10">
      <el-badge is-dot class="item m-r-20">
        <el-button type="text" class="share-button" icon="el-icon-bell font-16"></el-button>
      </el-badge>
      <el-dropdown>
        <span class="el-dropdown-link cursor-pointer">
          caicai
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-upload m-r-10"></i>github</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-back m-r-10"></i>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  padding: 0 10px;
}
</style>
