<template>
  <div style="text-align: left">
    <h3>{{id?'编辑':'新建'}}分类</h3>
    <el-form ref="form" label-width="180px">
      <el-form-item label="上级分类">
        <el-select v-model="formValue.parent" placeholder="请选择">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
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
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      formValue: {
        parent: "",
        name: ""
      },
      parents: []
    };
  },
  methods: {
    async onSubmit() {
      if (this.id) {
        // 编辑修改
        await this.$http.put(`/rest/categories/${this.id}`, this.formValue);
      } else {
        //新增
        await this.$http.post("/rest/categories", this.formValue);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    fetch() {
      this.$http.get(`/rest/categories/${this.id}`).then(res => {
        this.formValue.name = res.data.name;
      });
    },
    fetchParent() {
      this.$http.get(`/rest/categories`).then(res => {
        this.parents = res.data;
      });
    }
  },
  created() {
    this.fetchParent();
    this.id && this.fetch();
  }
};
</script>
<style lang="scss" scoped>
</style>