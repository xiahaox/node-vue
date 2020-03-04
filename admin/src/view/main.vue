<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="1-1">
              <router-link :to="{path:'/items/create'}">新建物品</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{path:'/items/list'}">物品列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="1-1">
              <router-link :to="{path:'/heroes/create'}">新建英雄</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{path:'/heroes/list'}">英雄列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="1-1">
              <router-link :to="{path:'/articles/create'}">新建文章</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{path:'/articles/list'}">文章列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>运营设置
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="1-1">
              <router-link :to="{path:'/categories/create'}">新建分类</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{path:'/categories/list'}">分类列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="1-1">
              <router-link :to="{path:'/ads/create'}">新建广告位</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{path:'/ads/list'}">广告位列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="1-1">
              <router-link :to="{path:'/admin_users/create'}">新建管理员</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{path:'/admin_users/list'}">管理员列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>-->
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>