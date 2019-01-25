<template>
  <div>
    <section>
      <el-button class="pull-left" @click="addUser()">新建</el-button>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status" type="success">启用</el-tag>
            <el-tag v-if="!scope.row.status" type="error">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="viewUser(scope.row)" type="text" size="small">
              <i class="el-icon-view"></i>
            </el-button>
            <el-button @click="updateUser(scope.row)" type="text" size="small">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button @click="deleteUser(scope.row)" type="text" size="small">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block m-t-20">
        <el-pagination background layout="prev, pager, next" :total="users.length"></el-pagination>
      </div>
    </section>

    <!-- view 弹出框 -->
    <el-dialog title="addUpdateModalTitle" width="30%" :visible.sync="viewUserModal">
      <el-form :model="viewform" class="text-left p-l-20">
        <p class="form-list">
          <span class="form-list-label">ID：</span>
          {{viewform.id}}
        </p>
        <p class="form-list">
          <span class="form-list-label">名称：</span>
          {{viewform.name}}
        </p>
        <p class="form-list">
          <span class="form-list-label">电话：</span>
          {{viewform.tel}}
        </p>
        <p class="form-list">
          <span class="form-list-label">邮箱：</span>
          {{viewform.email}}
        </p>
        <p class="form-list">
          <span class="form-list-label">描述：</span>
          {{viewform.desc}}
        </p>
        <p class="form-list">
          <span class="form-list-label">状态：</span>
          <el-switch v-model="viewform.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewUserModal = false">取 消</el-button>
        <el-button type="primary" @click="viewUserModal = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- view 弹出框 -->
    <!-- 修改 弹出框 -->
    <el-dialog title="用户" width="50%" :visible.sync="addUpdateModal">
      <el-form ref="form" :model="viewform" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="viewform.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="viewform.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="viewform.email"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="viewform.desc"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="text-left">
          <el-switch v-model="viewform.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUpdateModal = false">取 消</el-button>
        <el-button type="primary" @click="saveUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 弹出框 -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Component } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import UserType from "../type/user";

@Component
export default class User extends Vue {
  @Getter("allUsers") public users!: any[];
  @Action("getUsersAction") public getUsersAction: any;
  @Action("deleteUserAction") public deleteUserAction: any;
  @Action("addUserAction") public addUserAction: any;

  viewUserModal: any = false;
  addUpdateModal: any = false;
  addUpdateModalTitle: any = null;

  viewform = new UserType();

  created() {
    this.$store.dispatch("getUsersAction");
  }

  public viewUser(user: any): void {
    console.log("user:" + user);
    this.viewUserModal = true;
    this.viewform = user;
  }
  public updateUser(user: any): void {
    console.log("updateUser");
    this.addUpdateModalTitle = "修改用户";
    this.addUpdateModal = true;
    this.viewform = JSON.parse(JSON.stringify(user));
  }
  public deleteUser(user: any): void {
    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.$store.dispatch("deleteUserAction", user);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
  public addUser(): void {
    this.addUpdateModalTitle = "新建用户";
    this.addUpdateModal = true;
    this.viewform = new UserType();
  }

  public saveUser(): void {
    this.$store.dispatch("addUserAction", this.viewform);
    this.addUpdateModal = false;
    this.$message({
      type: "success",
      message: "保存成功!"
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-list-label {
  width: 60px;
  display: inline-block;
}
.w-80 {
  width: 80px;
}
.form-list {
  line-height: 30px;
}
</style>
