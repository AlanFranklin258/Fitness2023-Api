const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema, model } = mongoose
let ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    userId : {type: ObjectId, select: false},
    username: { type: String, required: true, unique: true, },
    password: {
        type: String,
        required: true,
        select: false, // 默认不显示
        set(val) { // 密码散列加密
            return require('bcryptjs').hashSync(val, 10) //第一个参数是这个值，第二个参数是散列的加密指数
        },
    },
    // avatar_url: { type: String, default:'' },
    gender: {
        type: String,
        enum: ['male', 'female'], // 枚举：男、女
        default: 'male', // 默认为男
        required: true,
    },
    teammate_id: {type: ObjectId},
    competitors_id:{ 
        type:[{
            type: ObjectId,
            ref: 'User',
        }],
        default:[]
    },
    medals:{
        type:[{
            type: Boolean,
        }],
        default: [false, false, false, false]
    }, // 由于没有给medal建表，medal的数据是定死的，所以这里的id是number形式的
    today_kcal: { type: Number, default: 0, }, // 今日运动卡路里
    today_exmin: { type: Number, default: 0, }, // 今日已运动分钟
    today_sportstate: { type: String, default: '0',}, // 今日运动状态，以最近一次运动状态为准，默认为'0'，表示休息
    group_id: {type:String, default:'-1'},
    group_tag: {type:String, default:'Z'}, // 八人为一组，每个人领取A~H中的一个作为标记

    newDay:{ type: Boolean, default: true}, // 表示新的一天，如果用户在新的一天登陆了，那么这个值会变为false，直到当天晚上22：00重置
    newWeek:{ type: Boolean, default: true}, // 表示新的一周，如果用户在新的一周登陆了，那么这个值会变为false，直到这周周日晚上22：00重置
    // goal_kcaladay: { type: Number, default: 300, }, // 今日目标运动卡路里
    // goal_exminaday: { type: Number, default: 30, }, // 今日目标运动分钟
    // heartsnum: { type: Number, default: 0, }, // 现有爱心数
    // heartsdonated: { type: Number, default: 0, }, // 已捐献爱心数
    // createAt: { type: Date, default: Date.now() }, // 注册时间
    // lastLoginAt: { type: Date, default: Date.now() } // 上一次登录时间


}, {
    // 设置时间 createdAt、updatedAt
    timestamps: true
})


module.exports = model('User', userSchema)