const mongoose = require('mongoose');
const { db_url } = require('./config.js');
const User = require('./schema/user');
const sportRecord = require('./schema/sportrecord');

exports.connect = ()=>{
    
    // 连接数据库
    mongoose.connect(db_url);
    // 鲁棒处理
    let max_connection_times = 3;
    let re_connection_times = 0;

    return new Promise((resovle,reject)=>{
        // 动态监听
        mongoose.connection.on('disconnected',()=>{
            console.log('*******数据库断开');
            if(re_connection_times<=max_connection_times){
                re_connection_times++;
                mongoose.connect(db_url);
            }else{
                reject();
                throw new Error('数据库出现问题！请人为处理！');
            }
        })
        mongoose.connection.on('error',(err)=>{
            console.log('*******数据库连接错误');
            if(re_connection_times<=max_connection_times){
                re_connection_times++;
                mongoose.connect(db_url);
            }else{
                reject(err);
                throw new Error('数据库出现问题！请人为处理！');
            }
        })
        mongoose.connection.once('open',()=>{
            console.log('*******数据库连接成功');
            resovle();
        })
    })
    

}
// 安排一些默认用户，一次性
exports.initUsers = ()=>{
    var date = new Date();
    // 一组测试数据
    let oneUser = new User({
        username: 'Alan',
        password: 'Alan1999',
        gender: 'male',
        group_id: '0',
        group_tag: 'A',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Siri',
        password: 'HiSiri1998',
        gender: 'female',
        group_id: '0',
        group_tag: 'B',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Tom',
        password: 'Tomcat1997',
        gender: 'male',
        group_id: '0',
        group_tag: 'C',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Jack',
        password: 'Jackmouse1996',
        gender: 'female',
        group_id: '0',
        group_tag: 'D',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Alex',
        password: 'Alex0000',
        gender: 'male',
        group_id: '0',
        group_tag: 'E',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Elaine',
        password: 'Elaine0521',
        gender: 'female',
        group_id: '0',
        group_tag: 'F',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Daniel',
        password: 'Daniel2022',
        gender: 'male',
        group_id: '0',
        group_tag: 'G',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Susan',
        password: 'Susan0725',
        gender: 'female',
        group_id: '0',
        group_tag: 'H',
    }).save().then(()=>{console.log('insert success!')})
}
exports.initUsers1 = ()=>{
    var date = new Date();
    // 第一组
    let oneUser = new User({
        username: 'YUKI',
        password: 'HiYuki',
        gender: 'male',
        group_id: '1',
        group_tag: 'A',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Sakura',
        password: 'sakura522',
        gender: 'male',
        group_id: '1',
        group_tag: 'B',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'lufi',
        password: 'lufi123',
        gender: 'male',
        group_id: '1',
        group_tag: 'C',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'lin12345',
        password: 'linyizi',
        gender: 'male',
        group_id: '1',
        group_tag: 'D',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'yutostral',
        password: 'yutostral321',
        gender: 'male',
        group_id: '1',
        group_tag: 'E',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'SISYPHE',
        password: 'SISYPHE99',
        gender: 'male',
        group_id: '1',
        group_tag: 'F',
    }).save().then(()=>{console.log('insert success!')})    
    oneUser = new User({
        username: 'XiXi',
        password: 'XIXI2023',
        gender: 'male',
        group_id: '1',
        group_tag: 'G',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'yp1477410',
        password: 'YP1477410',
        gender: 'male',
        group_id: '1',
        group_tag: 'H',
    }).save().then(()=>{console.log('insert success!')})
}
exports.initUsers2 = ()=>{
    var date = new Date();
    // 第二组
    let oneUser = new User({
        username: 'feixia0726',
        password: 'Feixia',
        gender: 'female',
        group_id: '2',
        group_tag: 'M',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'mean',
        password: 'MEAN123',
        gender: 'female',
        group_id: '2',
        group_tag: 'N',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'zzy',
        password: 'ZZY99',
        gender: 'female',
        group_id: '2',
        group_tag: 'O',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'ZX',
        password: 'ZX321',
        gender: 'female',
        group_id: '2',
        group_tag: 'P',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Chelsea',
        password: 'CC2023',
        gender: 'female',
        group_id: '2',
        group_tag: 'Q',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'Darby',
        password: 'Darby00',
        gender: 'female',
        group_id: '2',
        group_tag: 'R',
    }).save().then(()=>{console.log('insert success!')})    
    oneUser = new User({
        username: 'WANGXIULIN',
        password: 'wangxiulin',
        gender: 'female',
        group_id: '2',
        group_tag: 'S',
    }).save().then(()=>{console.log('insert success!')})
    oneUser = new User({
        username: 'enli',
        password: 'Enli0709',
        gender: 'female',
        group_id: '2',
        group_tag: 'T',
    }).save().then(()=>{console.log('insert success!')})
}


// 初始化组队信息
const {setNewGroup} = require('./apis/user');
const {insertRecordRandomly} = require('./apis/sportrecord');
const {timestampFree} = require('./apis/utils');
exports.initGroup = async()=>{
    await setNewGroup('0', 1);
}

// 初始化运动记录
exports.initRecords = async(begin, end)=>{
    // Alan
    for(var i = begin; i >= end; i--){
        var date = timestampFree(-i);
        insertRecordRandomly('Alan', date);
    }
    // Siri
    for(var i = begin; i >= end; i--){
        var date = timestampFree(-i);
        insertRecordRandomly('Siri', date);
    }
    // Tom
    for(var i = begin; i >= end; i--){
        var date = timestampFree(-i);
        insertRecordRandomly('Tom', date);
    }
    // Jack
    for(var i = begin; i >= end; i--){
        var date = timestampFree(-i);
        insertRecordRandomly('Jack', date);
    }
    // Alex
    for(var i = begin; i >= end; i--){
        var date = timestampFree(-i);
        insertRecordRandomly('Alex', date);
    }
    // Siri
    for(var i = begin; i >= end; i--){
        var date = timestampFree(-i);
        insertRecordRandomly('Elaine', date);
    }
    // Tom
    for(var i = begin; i >= end; i--){
        var date = timestampFree(-i);
        insertRecordRandomly('Daniel', date);
    }
    // Jack
    for(var i = begin; i >= end; i--){
        var date = timestampFree(-i);
        insertRecordRandomly('Susan', date);
    }
}

// 清空用户
exports.clearUsers = async()=>{
    User.deleteMany().then(()=>{console.log('delete all users success!')});
}

// 清空运动记录
exports.clearRecords = async()=>{
    sportRecord.deleteMany().then(()=>{console.log('delete all records success!')});
}

// 按组清空数据
exports.clearRecordsByGroup = async(group_id)=>{
    const users = await User.find({group_id:group_id});
    for(var i = 0; i < users.length; i++){
        await sportRecord.deleteMany({belong_to_user: users[i]._id});
    }
    console.log('delete group '+group_id+' records success!');
}