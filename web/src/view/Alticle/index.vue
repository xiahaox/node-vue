<template>
  <div id="article-wrapper">
    <div class="header flex jc-between height-d75 mb-d24">
      <div class="flex ai-center text-dark-1">
        <span class="arrow fs-d1 mx-d2" @click="home"></span>
        <strong class="overflow-ellipsis fs-d1">{{data.title}}</strong>
      </div>
      <span class="text-grey fs-d22 flex ai-center pr-d1">{{data.createdAt | convertDate}}</span>
    </div>
    <div v-html="data.body" class="fs-d1 article"></div>
    <div class="border-top-grey relevant my-d3">
      <strong class="fs-d26">相关资讯</strong>
      <router-link
        :to="`/article/${item._id}`"
        v-for="item in related"
        v-bind:key="item._id"
        class="flex jc-between"
      >
        <span class="text-dark-1 overflow-ellipsis fs-d1">{{item.title}}</span>
        <span class="text-grey fs-d1">{{item.createdAt | convertDate}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "articles",
  props: {
    // 文章 id
    id: { required: true }
  },
  data() {
    return {
      // 文章详情信息
      data: {},
      // 相关资讯集合
      related: []
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    // 获取文章详情
    getArticle() {
      this.$http.get(`/news/detail/${this.$route.params.id}`).then(res => {
        let { data, related } = res.data;
        this.data = data;
        this.related = related;
        console.log(data);
      });
    },
    // 回到首页
    home() {
      this.$router.push("/home");
    }
  },
  watch: {
    // id: "getArticle"
  }
};
</script>

<style lang="scss">
#article-wrapper {
  // p {
  //   line-height: 0.6rem;
  // }

  img {
    max-width: 100%;
    height: auto;
  }
}
</style>

<style lang="scss" scoped>
#article-wrapper {
  .header {
    box-shadow: 0 0 2px 0 #737373;
  }
  .arrow {
    transform: scaleY(1.5);
  }

  .article {
    padding: 0 5%;
    .ql-align-center,
    p {
      height: 1rem;
      line-height: 1rem;
    }
  }
}
// #article-wrapper {
//   .article {
//   }
// }
</style>