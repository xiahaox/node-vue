<template>
  <div style="text-align: left">
    <h3>{{id?'编辑':'新建'}}物品</h3>
    <el-form ref="form" label-width="180px">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="formValue.parent" placeholder="请选择">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="formValue.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+`upload`"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="formValue.icon" :src="formValue.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      formValue: {
        icon: "",
        name: ""
      }
    };
  },
  methods: {
    afterUpload(res) {
      console.log(res);
      this.formValue.icon = res.url;
    },
    async onSubmit() {
      if (this.id) {
        // 编辑修改
        await this.$http.put(`/rest/items/${this.id}`, this.formValue);
      } else {
        //新增
        await this.$http.post("/rest/items", this.formValue);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    fetch() {
      this.$http.get(`/rest/items/${this.id}`).then(res => {
        this.formValue.name = res.data.name;
      });
    },
    fetchParent() {
      this.$http.get(`/rest/items`).then(res => {
        this.parents = res.data;
      });
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
<style scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>