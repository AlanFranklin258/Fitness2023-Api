const sportRecord = require('../schema/sportrecord');
const User = require('../schema/user');
const {modifySportInfoToday} = require('../apis/user');
const {timeString} = require('../apis/utils');


class sport_record_controller {

    /**
     * 插入一条运动记录
     * @param {*} ctx 
     */
    async insertRecord(ctx){
        console.log('插入数据中...');
        // console.log(ctx);
        const belong_to_user = ctx.query.userid;
        const calory = ctx.query.calory;
        const sport_min = ctx.query.sport_min;
        const sport_type = ctx.query.sport_type; // string类型的idx数字
        const user = await User.findOne({_id:belong_to_user});
        const time_string = timeString(new Date());
        const statistic_type = 'single';
        console.log(belong_to_user);
        console.log(calory);
        console.log(sport_min);
        let oneRecord = new sportRecord({
            belong_to_user: belong_to_user,
            calory: calory,
            sport_min: sport_min,
            sport_type: sport_type,
            statistic_type: statistic_type,
            with_teammate_id: user.teammate_id,
            with_competitor0_id: user.competitors_id[0],
            with_competitor1_id: user.competitors_id[1],
            time_string: time_string,
        }).save().then(()=>{console.log('insert one single record success!')})
        await modifySportInfoToday(belong_to_user, calory, sport_min, sport_type);
        ctx.body = {}
    }
    /**
     * 根据用户id获取运动记录
     * @param {*} ctx 
     */
    async getRecordsByUserId(ctx){

    }

}

module.exports = new sport_record_controller();