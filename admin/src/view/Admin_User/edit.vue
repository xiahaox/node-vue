<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="info.password" placeholder="密码不会以明文显示，如需修改，直接输入内容保存"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "adminCreate",
  props: {
    id: {}
  },
  data() {
    return {
      info: {
        //用户名
        username: "",
        //密码
        password: ""
      }
    };
  },
  created() {
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //获取管理员信息
    getInfo() {
      let url = `rest/admin_users/${this.id}`;
      this.$http.get(url).then(res => {
        this.info = res.data;
      });
    },
    //保存信息
    save() {
      let { id, info } = this;
      let method;
      let url = "rest/admin_users";
      let data = info;

      if (id) {
        method = "put";
        url = `${url}/${id}`;
      } else {
        method = "post";
      }

      this.$http({
        method,
        url,
        data
      }).then(() => {
        this.$router.push("/admin_users/list");
      });
    }
  }
};
</script>