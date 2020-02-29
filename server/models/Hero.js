//利用mongoose操作mongoDB数据库

const mongoose = require('mongoose')
//1.定义表结构
var userModel = new mongoose.Schema({
    // id: Number,
    name: String,
    avatar: String,
    title: String,
    //英雄分类 (单个英雄可能属于多个分类，所以这里使用数组方式)
    categories: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category'
        }
    ],
    //评分
    scores: {
        //难度
        difficult: {
            type: Number,
            default: 0
        },
        //技能
        skills: {
            type: Number,
            default: 0
        },
        //攻击
        attack: {
            type: Number,
            default: 0
        },
        //生存
        survive: {
            type: Number,
            default: 0
        },
    },
    //技能
    skills: [
        {
            //技能图标
            icon: { type: String },
            //冷却值
            delay: { type: String },
            //消耗
            cost: { type: String },
            //技能名称
            name: { type: String },
            //描述
            description: { type: String },
            //小提示
            tips: { type: String }
        }
    ],
    //出装装备（顺风出装）
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    //逆风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    //铭文推荐
    rune: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Rune' }],
    //使用技巧 
    usageTips: { type: String },
    //对抗技巧
    battleTips: { type: String },
    //团战思路
    teamTips: { type: String },
    //最佳搭档
    partners: [
        {
            //关联英雄模型
            hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
            //描述
            description: { type: String }
        }
    ],
    //被谁克制
    controledBy: [
        {
            //关联英雄模型
            hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
            //描述
            description: { type: String }
        }
    ],
    //克制谁
    control: [
        {
            //关联英雄模型
            hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
            //描述
            description: { type: String }
        }
    ],
})

//2.将表的数据结构与表关联起来  并 导出

module.exports = mongoose.model('Hero', userModel)