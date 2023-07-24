const User = require('../schema/user');
const sportRecord = require('../schema/sportrecord');
const {timeString, timestampFree} = require('../apis/utils');
const {modifySportInfoToday} = require('./user');


exports.insertRecordsToday = async () => {
    const users = await User.find();
    var i = 0;
    for(i = 0; i < users.length; i++){
        // console.log(rightnow);
        // console.log(users[i].createdAt);
        // console.log(rightnow.getTime()-users[i].createdAt.getTime());
        // console.log(records);
        // console.log(records[0].createdAt);
        const time_string = timeString(new Date());
        let oneRecord = new sportRecord({
            belong_to_user: users[i]._id,
            calory: users[i].today_kcal,
            sport_min: users[i].today_exmin,
            sport_type: users[i].today_sportstate,
            statistic_type: 'today',
            with_teammate_id: users[i].teammate_id,
            with_competitor0_id: users[i].competitors_id[0],
            with_competitor1_id: users[i].competitors_id[1],
            time_string: time_string,
        }).save().then(()=>{console.log('insert one today record success!')})
        User.updateOne({_id: users[i]._id},{today_kcal:0, today_exmin:0, today_sportstate:'0'}).then(()=>{console.log('update success!')})
    }
    // console.log(user);
}

exports.insertRecordSingle = async(username, calory, sport_min, sport_type) =>{
    const user = await User.findOne({username:username});
    if(user){
        const time_string = timeString(new Date());
        let oneRecord = new sportRecord({
            belong_to_user: user._id,
            calory: calory,
            sport_min: sport_min,
            sport_type: sport_type,
            statistic_type: 'single',
            with_teammate_id: user.teammate_id,
            with_competitor0_id: user.competitors_id[0],
            with_competitor1_id: user.competitors_id[1],
            time_string: time_string,
        }).save().then(()=>{console.log('insert one single record success!')})
        await modifySportInfoToday(user._id, calory, sport_min, sport_type);
    }
}

exports.insertRecordRandomly = async (username, date)=>{
    // 应需求，每人每天随机的数据应该包含两条single和当日的today
    const calory1 = Math.floor(Math.random()*200);
    const sport_min1 = Math.floor(Math.random()*60);
    const sport_type1 = (Math.floor(Math.random()*(7))+1).toString();
    const statistic_type1 = 'single';
    const calory2 = Math.floor(Math.random()*200);
    const sport_min2 = Math.floor(Math.random()*60);
    const sport_type2 = (Math.floor(Math.random()*(7))+1).toString();
    const statistic_type2 = 'single';

    const calory = calory1 + calory2;
    const sport_min = sport_min1 + sport_min2;
    const sport_type = (Math.floor(Math.random()*(7))+1).toString();
    const statistic_type = 'today'
    const user = await User.findOne({username:username});
    const time_string = timeString(date);
    let oneRecord = new sportRecord({
        belong_to_user: user._id,
        calory: calory1,
        sport_min: sport_min1,
        sport_type: sport_type1,
        statistic_type: statistic_type1,
        with_teammate_id: user.teammate_id,
        with_competitor0_id: user.competitors_id[0],
        with_competitor1_id: user.competitors_id[1],
        time_string: time_string,
        createdAt: date,
    }).save().then(()=>{console.log('insert one single record success!')});
    oneRecord = new sportRecord({
        belong_to_user: user._id,
        calory: calory2,
        sport_min: sport_min2,
        sport_type: sport_type2,
        statistic_type: statistic_type2,
        with_teammate_id: user.teammate_id,
        with_competitor0_id: user.competitors_id[0],
        with_competitor1_id: user.competitors_id[1],
        time_string: time_string,
        createdAt: date,
    }).save().then(()=>{console.log('insert one single record success!')});
    oneRecord = new sportRecord({
        belong_to_user: user._id,
        calory: calory,
        sport_min: sport_min,
        sport_type: sport_type,
        statistic_type: statistic_type,
        with_teammate_id: user.teammate_id,
        with_competitor0_id: user.competitors_id[0],
        with_competitor1_id: user.competitors_id[1],
        time_string: time_string,
        createdAt: date,
    }).save().then(()=>{console.log('insert one today record success!')});
}

exports.weekCountByRecordNumber = async (group)=>{
    const users = await User.find({group_id: group});
    if(users){
        const records = await sportRecord.find({statistic_type: 'today'});
        if(!records) return 1;
        else{
            if(records.length < 7) return 1;
            else return 2;
        }
    }
}

const ObjectToCSV = require('objects-to-csv');
exports.getRecordsToCsv = async (begin, end)=>{
    var csv = [];
    var sportMode=[
        {
            idx: 0,
            name: '休息',
            percent: 100,
            kcalperhour: [0, 0],
            src: '/common/images/index_relax.png'
        },
        {
            idx: 1,
            name: '跑步',
            percent: 85,
            kcalperhour: [462, 392],
            src: '/common/images/index_running.png',
        },
        {
            idx: 2,
            name: '步行',
            percent: 71,
            kcalperhour: [231, 196],
            src: '/common/images/index_walking.png'
        },
        {
            idx: 3,
            name: '骑行',
            percent: 57,
            kcalperhour: [264, 224],
            src: '/common/images/index_biking.png'
        },
        {
            idx: 4,
            name: '力量',
            percent: 42,
            kcalperhour: [462, 392],
            src: '/common/images/index_power.png',
        },
        {
            idx: 5,
            name: '游泳',
            percent: 28,
            kcalperhour: [638, 541],
            src: '/common/images/index_swimming.png'
        },
        {
            idx: 6,
            name: '球类',
            percent: 14,
            kcalperhour: [385, 326],
            src: '/common/images/index_ball.png'
        },
        {
            idx: 7,
            name: '有氧',
            percent: 0,
            kcalperhour: [264, 224],
            src: '/common/images/index_aerobic.png'
        },
    ]
    for(var i = begin; i>=end; i--){
        var date = timestampFree(-i);
        var time_string = timeString(date);
        var records = await sportRecord.find({time_string: time_string}).sort({belong_to_user: 1});
        //var records = await sportRecord.find({statistic_type:'today', time_string: time_string}).sort({belong_to_user: 1}).sort({createdAt: 1});
        console.log(records[0]);
        for(var j = 0; j < records.length; j++){
            var user = await User.findOne({_id:records[j].belong_to_user});
            var tm = await User.findOne({_id:user.teammate_id});
            var sport_type_name = sportMode[Number(records[j].sport_type)].name;
            csv.push({
                record_id: records[j]._id,
                user_id: records[j].belong_to_user,
                user_name: user.username,
                user_gender: user.gender,
                user_tag: user.group_tag,
                teammate_tag: tm.group_tag,
                statistic_type: records[j].statistic_type,
                calory: records[j].calory,
                sport_min: records[j].sport_min,
                sport_type: records[j].sport_type,
                sport_type_name: sport_type_name,
                medal_1: user.medals[0], 
                medal_2: user.medals[1], 
                medal_3: user.medals[2], 
                medal_4: user.medals[3], 
                date: time_string,
            })
        }    
    }
    // console.log(csv[0]);

    let toCsv = new ObjectToCSV(csv);
    await toCsv.toDisk('./records_output_single.csv');
    console.log("write csv down!");
}