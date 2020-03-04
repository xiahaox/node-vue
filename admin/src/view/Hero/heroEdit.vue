<template>
  <div style="text-align: left">
    <h3>{{id?'编辑':'新建'}}英雄</h3>
    <el-form ref="form" label-width="180px">
      <el-tabs type="border-card">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="formValue.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="formValue.title"></el-input>
          </el-form-item>
          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader banner"
              :headers="setHeader"
              :action="$http.defaults.baseURL+`upload`"
              :on-success="res => $set(formValue, 'banner', res.url)"
              :show-file-list="false"
            >
              <img width="100%" v-if="formValue.banner" :src="formValue.banner" class="icon" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="formValue.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="formValue.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="formValue.scores.attach"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="formValue.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="formValue.items1" multiple>
              <el-option
                v-for="(item) in itemList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="formValue.items2" multiple>
              <el-option
                v-for="(item) in itemList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="formValue.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="formValue.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="formValue.teamTips"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formValue.categories" multiple>
              <el-option
                v-for="item in categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :headers="setHeader"
              :action="$http.defaults.baseURL+`upload`"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="formValue.avatar" :src="formValue.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <!-- 技能 -->
        <el-tab-pane label="技能">
          <el-button type="text" @click="addSkill">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              style="margin-top: 20px;"
              :md="12"
              v-for="(item, index) in formValue.skills"
              :key="index"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :headers="setHeader"
                  :action="uploadUrl"
                  :on-success="res => $set(item, 'icon', res.url)"
                  :show-file-list="false"
                >
                  <img v-if="item.icon" :src="item.icon" class="icon" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="delSkill(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
        //名称
        name: "",
        //称号
        title: "",
        // 背景图
        banner: "",
        //头像
        avatar: "",
        //分类
        categories: [],
        //顺风出装
        items1: [],
        //逆风出装
        items2: [],
        //评分
        scores: {
          difficult: 0,
          skills: 0,
          attach: 0,
          survive: 0
        },
        //使用技巧
        usageTips: "",
        //对抗技巧
        battleTips: "",
        //团战思路
        teamTips: "",
        //技能
        skills: [],
        //铭文推荐
        rune: [],
        //最佳搭档
        partners: [],
        //被谁克制
        controledBy: [],
        //克制谁
        control: []
      },
      //类型分类
      categories: [],
      //装备（物品）列表
      itemList: [],
      //英雄列表
      heroList: [],
      //铭文列表
      runeList: []
    };
  },
  methods: {
    afterUpload(res) {
      this.formValue.avatar = res.url;
    },
    async onSubmit() {
      if (this.id) {
        // 编辑修改
        await this.$http.put(`/rest/heroes/${this.id}`, this.formValue);
      } else {
        //新增
        await this.$http.post("/rest/heroes", this.formValue);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    fetch() {
      this.$http.get(`/rest/heroes/${this.id}`).then(res => {
        this.formValue = res.data;
      });
    },
    fetchParent() {
      this.$http.get(`/rest/heroes`).then(res => {
        this.parents = res.data;
      });
    },
    //获取英雄分类
    getCategories() {
      this.$http.get("rest/categories").then(res => {
        this.categories = res.data;
      });
    },
    //获取装备（物品）
    getItemsList() {
      let url = "rest/items";
      this.$http.get(url).then(res => {
        this.itemList = res.data;
      });
    },
    //添加技能
    addSkill() {
      this.formValue.skills.push({});
    },
    //删除技能
    delSkill(index) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.formValue.skills.splice(index, 1);
      });
    }
  },
  created() {
    this.id && this.fetch();
    this.getCategories();
    this.getItemsList();
  }
};
</script>
<style scoped>
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