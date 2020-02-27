<template>
  <div>
    <h3>新建分类</h3>
    <el-form ref="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="formValue.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import axios from "axios";
// import { AxiosInstance } from "../axios";
export default {
  data() {
    return {
      formValue: {
        name: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$http.post("/categoies", this.formValue).then(res => {
        console.log(res);
        this.$router.push("/categories/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>