const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

// 连接mongodb数据库
const {connect, initUsers, initUsers1, initUsers2, initGroup, initRecords, clearRecords, clearRecordsByGroup, clearUsers} = require('./db');
;(async()=>{
    await connect();
    // await initUsers2();

    // setNewGroup('2', 2);
    // await initRecords(12, 6);

    // setNewGroup('0', 2);
    // await initRecords(5, 1);

    // setNewGroup('1', 1);
    
    /**
     * 清除数据之前先看看连的是哪个数据库！！！
     */
    // await clearRecords();
    // await clearRecordsByGroup('2');
    // await clearUsers();

})()

// 使用koa-parameter中间件校验参数格式是否正确
const parameter = require('koa-parameter')
app.use(parameter(app)) // 全局使用

// 解决跨域
const cors = require('koa2-cors');
app.use(cors());

// app.use(bodyParser());

// 配置路由
const user_router = require('./routes/user');
app.use(user_router.routes());
app.use(user_router.allowedMethods());
const sport_record_router = require('./routes/sportrecord');
app.use(sport_record_router.routes());
app.use(sport_record_router.allowedMethods());

const schedule = require('node-schedule');
const {insertRecordsToday, weekCountByRecordNumber, getRecordsToCsv, insertRecordSingle} = require('./apis/sportrecord');
const {setNewDay, setNewWeek, setMedals, setNewGroup,}  = require('./apis/user');
//  setNewDay('0');
//  setNewWeek();
//  setMedals();

// getRecordsToCsv(4,1);

// 插入单条记录，同时更新个人状态
// insertRecordSingle('WANGXIULIN', 333, 51, '1');

// 手动设置第二周
// setNewGroup('0', 2);
// setNewGroup('1', 2);
// setNewGroup('2', 2);

app.listen(5000,()=>{
    console.log('fitness2023 starting at port 5000');
    let rule = new schedule.RecurrenceRule();

    // 按照需求，北京时间每天晚上22：00要结算当天的运动情况
    // 不需要换算成格林尼治时间，因为schedule包默认是北京时间
    rule.hour = 23;
    rule.minute = 59;
    rule.second = 59;

    let job = schedule.scheduleJob(rule, () => {
        console.log(new Date());
        var date = new Date();
        insertRecordsToday();

        // 重置各组新一天/新一周状态
        setNewDay('0');
        if(date.getDay()==0){
            setNewWeek('0');
        }
        setNewDay('1');
        if(date.getDay()==0){
            setNewWeek('1');
        }
        setNewDay('2');
        if(date.getDay()==0){
            setNewWeek('2');
        }
    });

})