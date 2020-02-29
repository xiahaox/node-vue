<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :pageSize="10"
      :current-page.sync="currentPage"
      @current-change="getArticleList"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "articleList",
  data() {
    return {
      //文章列表
      articleList: [
        {
          title: "",
          body: "",
          categories: []
        }
      ],
      // 总条数
      total: 0,
      // 当前页数
      currentPage: 1
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    //获取文章列表
    getArticleList() {
      let url = "rest/articles";
      this.$http.get(url).then(res => {
        this.articleList = res.data;
        // this.total = totalCount;
      });
    },
    //编辑
    edit(id) {
      this.$router.push(`/articles/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = `rest/articles/${id}`;
        this.$http.delete(url).then(() => {
          this.getArticleList();
        });
      });
    }
  }
};
</script>
