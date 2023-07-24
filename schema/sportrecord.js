const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema, model } = mongoose
let ObjectId = Schema.Types.ObjectId;

const sportrecordSchema = new Schema({
    recordId: {type: ObjectId, select: false},
    belong_to_user : {type: ObjectId},
    calory: {type: Number, default: 0}, // 运动消耗卡路里，单位是kcal
    sport_min: {type: Number, default: 0}, // 运动时长，单位是min
    sport_type: {type: String, default: '0',}, // 运动的类型
    statistic_type: {type: String, defalut: 'single'}, // 统计类型，如果是today表示该条记录是一整天的总合

    with_teammate_id: {type: ObjectId},
    with_competitor0_id: {type: ObjectId},
    with_competitor1_id: {type: ObjectId},

    time_string : {type: String, default: ''},
}, {
    // 设置时间 createdAt、updatedAt
    timestamps: true
})


module.exports = model('sportrecord', sportrecordSchema)