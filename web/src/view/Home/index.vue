<template>
  <div class="web-home">
    <!-- 顶部轮播图 -->
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="item in carouselList" :key="item.id">
        <a :href="item.path || '#'">
          <img :src="item.imgUrl" class="width-100p" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 新闻资讯模块 -->
    <siteCard title="新闻资讯" :categories="newsList" allPath="/all-news">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`article/${item._id}`"
          v-for="(item, index) in category.newsList"
          v-bind:key="index"
          class="flex ai-center fs-d1 mb-d3"
        >
          <span class="text-grey ws-nowrap">[{{item.categoryName}}]</span>
          <span>|</span>
          <span class="ws-nowrap overflow-ellipsis">{{item.title}}</span>
          <span class="text-666 posi_r fs-d1">{{item.createdAt | convertDate}}</span>
        </router-link>
      </template>
    </siteCard>

    <!-- 英雄列表模块 -->
    <siteCard class="hero" title="英雄列表" :categories="heroList" allPath="/all-hero">
      <template v-slot:header>
        <router-link :to="`/heroes/${newestHero._id}`">
          <div class="newestHero width-100p position-re pb-d3 mb-d24 height-2d3">
            <img :src="newestHero.banner" class="width-100p" />
          </div>
        </router-link>
      </template>
      <template #items="{category}">
        <div class="flex flex-wrap herosBox">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            v-for="(hero, index) in category.heroList"
            :key="index"
            class="herosBox_item"
          >
            <img :src="hero.avatar" class="width-98p" />
            <p class="flex jc-center fs-d24 mt-d1">{{hero.name}}</p>
          </router-link>
        </div>
      </template>
    </siteCard>
  </div>
</template>
<script>
import Card from "../components/Card";
export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    siteCard: Card
  },

  data() {
    return {
      // 新闻资讯列表
      newsList: [],
      // 英雄分类列表
      heroList: [],
      // 最新英雄
      newestHero: {
        banner:
          "//ossweb-img.qq.com/upload/webplat/info/yxzj/20200108/20796372351730.jpg"
      },
      // 轮播图列表
      carouselList: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true
      }
    };
  },
  mounted() {
    this.getNewsList();
    this.getHeroList();
    this.getCarousel();
    // this.getNewestHero();
  },
  methods: {
    // 获取新闻资讯
    getNewsList() {
      this.$http.get("/news/home/list").then(res => {
        this.newsList = res.data;
        console.log(res.data);
      });
    },
    // 获取轮播图
    getCarousel() {
      this.$http.get("home/carousel").then(res => {
        this.carouselList = res.data;
      });
    },
    // 获取最新英雄
    getNewestHero() {
      this.$http.get("/heroes/newest").then(res => {
        this.newestHero = res.data;
      });
    },
    // 获取英雄列表
    getHeroList() {
      this.$http.get("heroes/list").then(res => {
        let { data } = res;
        data.forEach((item, index) => {
          if (item.name === "全部") {
            data.splice(index, 1);
            this.heroList = data;
            return;
          }
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.web-home {
  .swiper-wrapper {
    height: auto !important;
  }

  .swiper-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding-right: 20px;
    margin-bottom: 20px;

    .swiper-pagination-bullet {
      background: #fff;
      opacity: 1;
      width: 0.17rem;
      height: 0.17rem;
      border-radius: 2px;

      &.swiper-pagination-bullet-active {
        background: #4b67af;
      }
    }
  }
}
.width-100p {
  width: 100%;
}
.herosBox {
  .herosBox_item {
    width: 20%;
    img {
      width: 92%;
    }
  }
}
</style>
