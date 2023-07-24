const User = require('../schema/user');
const sportRecord = require('../schema/sportrecord');

const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../config.js');
const {insertRecordToday} = require('../apis/sportrecord');
const sillydatetime = require('silly-datetime');


class user_controller{
    /**
     * 登录
     * @param {*} ctx 
     */
    async login(ctx){
        console.log('开始登录...');
        const username = ctx.query.username;
        const password = ctx.query.password;
        console.log('用户名为' + username);
        console.log('密码为' + password);
        
        //1、根据用户名找用户，查的时候把password字段取出来
        const user = await User.findOne({ username: username }).select('+password');
        //const user = await User.findOne({ username: username });
        if (!user) {
            console.log('用户名不存在');
            ctx.throw(422, '用户名不存在');
        }
        // console.log(user);
        //2、校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password) //比较明文和密文是否匹配
        if (!isValid) {
            console.log('用户名或密码不正确')
            ctx.throw(401, '用户名或密码不正确')
        } 
        // jwt身份认证，获取token
        const { _id, name } = user
        const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' }) //过期时间为一天
        ctx.body = { token: token, userid: _id }
        console.log('登陆成功！');
    }

    /**
     * 获取用户基本资料
     * @param {*} ctx 
     */
    async getInfo(ctx){
        console.log('开始获取用户信息...');
        const userid = ctx.query.userid;
        const user = await User.findOne({_id: userid});
        if (!user) {
            console.log('用户不存在');
            ctx.throw(422, '用户不存在');
        }
        //console.log(user);

        const teammate = await User.findOne({_id: user.teammate_id});
        const competitor0 = await User.findOne({_id: user.competitors_id[0]});
        const competitor1 = await User.findOne({_id: user.competitors_id[1]});

        // 现在限定试验一共进行两周，所以每个用户的日运动记录理论上最多是14条
        var records = await sportRecord.find({belong_to_user: userid, statistic_type:'today'}).sort({createdAt: 1});
        var myTeamScores = [];
        var coTeamScores = [];
        var nameList = [];
        var caloryList = [];
        var sportMinList = [];
        var stateList = [];
        if (records){
            for(var i = 0; i < records.length; i++){
                var tmRec = await sportRecord.findOne({time_string: records[i].time_string, belong_to_user: records[i].with_teammate_id, statistic_type: 'today'});
                var c0Rec = await sportRecord.findOne({time_string: records[i].time_string, belong_to_user: records[i].with_competitor0_id, statistic_type: 'today'});
                var c1Rec = await sportRecord.findOne({time_string: records[i].time_string, belong_to_user: records[i].with_competitor1_id, statistic_type: 'today'});
                console.log(records[i].sport_min + tmRec.sport_min);
                console.log(c0Rec.sport_min + c1Rec.sport_min);
                myTeamScores.push(records[i].sport_min + tmRec.sport_min);
                coTeamScores.push(c0Rec.sport_min + c1Rec.sport_min);

                // 专门存放昨天的记录
                if(i == records.length-1){
                    const me = await User.findOne({_id: records[i].belong_to_user});
                    const tm = await User.findOne({_id: records[i].with_teammate_id});
                    const c0 = await User.findOne({_id: records[i].with_competitor0_id});
                    const c1 = await User.findOne({_id: records[i].with_competitor1_id});
                    nameList.push(me.username);
                    nameList.push(tm.username);
                    nameList.push(c0.username);
                    nameList.push(c1.username);
                    caloryList.push(records[i].calory);
                    caloryList.push(tmRec.calory);
                    caloryList.push(c0Rec.calory);
                    caloryList.push(c1Rec.calory);
                    sportMinList.push(records[i].sport_min);
                    sportMinList.push(tmRec.sport_min);
                    sportMinList.push(c0Rec.sport_min);
                    sportMinList.push(c1Rec.sport_min);
                    stateList.push(records[i].sport_type);
                    stateList.push(tmRec.sport_type);
                    stateList.push(c0Rec.sport_type);
                    stateList.push(c1Rec.sport_type);
                    // console.log(nameList);
                    // console.log(caloryList);
                    // console.log(sportMinList);
                    // console.log(stateList);
                }
            }
        }else{
            records = [];
        }
        
        // console.log(myTeamScores);
        // console.log(coTeamScores);
        // 将前端的静态数据尽可能挪到后端，方便修改
        // 数据可以修改，但是图片资源不太好弄，如需增加，在不更新前端的情况下，只能复用已经存在的图片
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

        // 当天首次登陆
        if(user.newDay==true){
            User.updateOne({_id: user._id}, {newDay: false}).then(()=>{console.log('today first login')});
        }
        // 当周首次登陆
        if(user.newDay==true){
            User.updateOne({_id: user._id}, {newWeek: false}).then(()=>{console.log('this week first login')});
        }

        ctx.body = {
            user: user,
            records: records.reverse(),
            teammate: teammate,
            competitor0: competitor0,
            competitor1: competitor1,
            myTeamScores: myTeamScores,
            coTeamScores: coTeamScores,
            sportMode: sportMode,
            heartRateLowerBound: 81,
            heartRateUpperBound: 200,
            nameList: nameList,
            caloryList: caloryList,
            sportMinList: sportMinList,
            stateList: stateList,
        };
    }
    /**
     * 获取团队PK的数据
     * 因为有实时更新团队PK进度条的需求，所以单独写一个接口，只为了获取该项数据
     */
    async getCurrentCompetition(ctx){
        const userid = ctx.query.userid;
        const user = await User.findOne({_id: userid});
        const teammate = await User.findOne({_id: user.teammate_id});
        const competitor0 = await User.findOne({_id: user.competitors_id[0]});
        const competitor1 = await User.findOne({_id: user.competitors_id[1]});
        var myTeamCurrentData = user.today_exmin + teammate.today_exmin;
        var coTeamCurrentData = competitor0.today_exmin + competitor1.today_exmin;
        ctx.body={
            myTeamCurrentData: myTeamCurrentData,
            coTeamCurrentData: coTeamCurrentData,
        };
    }
    

    /**
     * 更新勋章获得情况
     * 该接口触发后，并不向前端更新user info，因为只更改了user里的medals字段，实在是没有必要
     */
    async updateMedals(ctx){
        const username = ctx.query.username;
        const medal_code = parseInt(ctx.query.medal); // 转成数字
        console.log('username:'+username);
        console.log('medal idx:' + ctx.query.medal);
        const user = await User.findOne({username:username});
        var medals = [];
        // 更新单个徽章会有异步问题，所以写了个很淳朴的二进制编码
        switch(medal_code){
            case 0:
                medals = [false, false, false, false];
                break;
            case 1:
                medals = [false, false, false, true];
                break;
            case 2:
                medals = [false, false, true, false];
                break;
            case 3:
                medals = [false, false, true, true];
                break;
            case 4:
                medals = [false, true, false, false];
                break;
            case 5:
                medals = [false, true, false, true];
                break;
            case 6:
                medals = [false, true, true, false];
                break;
            case 7:
                medals = [false, true, true, true];
                break;
            case 8:
                medals = [true, false, false, false];
                break;
            case 9:
                medals = [true, false, false, true];
                break;
            case 10:
                medals = [true, false, true, false];
                break;
            case 11:
                medals = [true, false, true, true];
                break;
            case 12:
                medals = [true, true, false, false];
                break;
            case 13:
                medals = [true, true, false, true];
                break;
            case 14:
                medals = [true, true, true, false];
                break;
            case 15:
                medals = [true, true, true, true];
                break;
            default:
                medals = [false, false, false, false];
                break;
        }
        console.log(medals);
        User.updateOne({_id: user._id},{medals: medals}).then(()=>{console.log('update medals success!')})
        ctx.body={}
    }


    /**
     * // 注册接口暂不开放，用作测试
     * @param {*} ctx 
     */
    async register(ctx){ 
        const username = ctx.query.username;
        const password = ctx.query.password;
        console.log('username:'+username);
        console.log('password:'+password);
        // const users = await User.find();
        // console.log(typeof(users));
        // console.log(users);
        // insertRecordToday();
        
        //console.log(new Date(new Date().setDate(new Date().getDate()+1)).getDay());
        //console.log(typeof(new Date().getDay()));
        
        console.log(sillydatetime.format(new Date, 'YYYY-MM-DD'));
        console.log(typeof(sillydatetime.format(new Date, 'YYYY-MM-DD')));

        ctx.body = {
            username: username,
            password: password,
        }
    }
}

module.exports = new user_controller();