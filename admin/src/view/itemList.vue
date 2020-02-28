<template>
  <div style="text-align: left">
    <h3>物品列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/items/edit/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button type="text" @click="remove(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/items");
      //   console.log(res);
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定删除${row.name}分类?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`/rest/items/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss" scoped>
</style>