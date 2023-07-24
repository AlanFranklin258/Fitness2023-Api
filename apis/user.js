const User = require('../schema/user');

exports.modifySportInfoToday = async (userId, calory, sport_min, sport_type) => {
    const user = await User.findOne({_id: userId});
    if (!user) return;
    // console.log(user);
    const new_calory = user.today_kcal + Number(calory);
    const new_exmin = user.today_exmin + Number(sport_min);
    const new_sportstate = sport_type;
    User.updateOne({_id: userId},{today_kcal:new_calory, today_exmin:new_exmin, today_sportstate:new_sportstate}).then(()=>{console.log('update success!')})
}

exports.makeTeam = async (username0, username1) => {
    const user0 = await User.findOne({username:username0});
    const user1 = await User.findOne({username:username1});
    User.updateOne({_id: user0._id}, {teammate_id: user1._id}).then(()=>{console.log(username0+' and ' + username1 + ' make team success 50%!')});
    User.updateOne({_id: user1._id}, {teammate_id: user0._id}).then(()=>{console.log(username0+' and ' + username1 + ' make team success 100%!')});
}

exports.makeCompetitors = async(username, cname1, cname2) => {
    const user = await User.findOne({username:username});
    const competitor1 = await User.findOne({username:cname1});
    const competitor2 = await User.findOne({username:cname2});
    User.updateOne({_id: user._id}, {competitors_id: [competitor1._id, competitor2._id]}).then(()=>{
        console.log(username+' make competitors success 100%!');
        console.log('competitor1:' + competitor1.username);
        console.log('competitor2:' + competitor2.username);
    });
}

exports.setNewGroup = async(group_id, week) => {
    const userA = await User.findOne({group_id: group_id, group_tag: 'A'});
    if(userA){
        const userB = await User.findOne({group_id: group_id, group_tag: 'B'});
        const userC = await User.findOne({group_id: group_id, group_tag: 'C'});
        const userD = await User.findOne({group_id: group_id, group_tag: 'D'});
        const userE = await User.findOne({group_id: group_id, group_tag: 'E'});
        const userF = await User.findOne({group_id: group_id, group_tag: 'F'});
        const userG = await User.findOne({group_id: group_id, group_tag: 'G'});
        const userH = await User.findOne({group_id: group_id, group_tag: 'H'});
        if(week==1){
            this.makeTeam(userA.username, userB.username);
            this.makeTeam(userC.username, userD.username);

            this.makeCompetitors(userA.username, userC.username, userD.username);
            this.makeCompetitors(userB.username, userC.username, userD.username);
            this.makeCompetitors(userC.username, userA.username, userB.username);
            this.makeCompetitors(userD.username, userA.username, userB.username);

            this.makeTeam(userE.username, userF.username);
            this.makeTeam(userG.username, userH.username);

            this.makeCompetitors(userE.username, userG.username, userH.username);
            this.makeCompetitors(userF.username, userG.username, userH.username);
            this.makeCompetitors(userG.username, userE.username, userF.username);
            this.makeCompetitors(userH.username, userE.username, userF.username);

        }else if(week==2){
            this.makeTeam(userA.username, userE.username);
            this.makeTeam(userB.username, userF.username);

            this.makeCompetitors(userA.username, userB.username, userF.username);
            this.makeCompetitors(userE.username, userB.username, userF.username);
            this.makeCompetitors(userB.username, userA.username, userE.username);
            this.makeCompetitors(userF.username, userA.username, userE.username);

            this.makeTeam(userC.username, userH.username);
            this.makeTeam(userD.username, userG.username);

            this.makeCompetitors(userC.username, userD.username, userG.username);
            this.makeCompetitors(userH.username, userD.username, userG.username);
            this.makeCompetitors(userD.username, userC.username, userH.username);
            this.makeCompetitors(userG.username, userC.username, userH.username);

        }
    }
    const userM = await User.findOne({group_id: group_id, group_tag: 'M'});
    if(userM){
        const userN = await User.findOne({group_id: group_id, group_tag: 'N'});
        const userQ = await User.findOne({group_id: group_id, group_tag: 'Q'});
        const userR = await User.findOne({group_id: group_id, group_tag: 'R'});
        const userO = await User.findOne({group_id: group_id, group_tag: 'O'});
        const userP = await User.findOne({group_id: group_id, group_tag: 'P'});
        const userS = await User.findOne({group_id: group_id, group_tag: 'S'});
        const userT = await User.findOne({group_id: group_id, group_tag: 'T'});
        if(week==1){
            this.makeTeam(userM.username, userT.username);
            this.makeTeam(userN.username, userS.username);

            this.makeCompetitors(userM.username, userN.username, userS.username);
            this.makeCompetitors(userT.username, userN.username, userS.username);
            this.makeCompetitors(userN.username, userM.username, userT.username);
            this.makeCompetitors(userS.username, userM.username, userT.username);

            this.makeTeam(userQ.username, userO.username);
            this.makeTeam(userR.username, userP.username);

            this.makeCompetitors(userQ.username, userR.username, userP.username);
            this.makeCompetitors(userO.username, userR.username, userP.username);
            this.makeCompetitors(userR.username, userQ.username, userO.username);
            this.makeCompetitors(userP.username, userQ.username, userO.username);

        }else if(week==2){
            this.makeTeam(userM.username, userN.username);
            this.makeTeam(userQ.username, userR.username);

            this.makeCompetitors(userM.username, userQ.username, userR.username);
            this.makeCompetitors(userN.username, userQ.username, userR.username);
            this.makeCompetitors(userQ.username, userM.username, userN.username);
            this.makeCompetitors(userR.username, userM.username, userN.username);

            this.makeTeam(userO.username, userP.username);
            this.makeTeam(userS.username, userT.username);

            this.makeCompetitors(userO.username, userS.username, userT.username);
            this.makeCompetitors(userP.username, userS.username, userT.username);
            this.makeCompetitors(userS.username, userO.username, userP.username);
            this.makeCompetitors(userT.username, userO.username, userP.username);

        }
    }
}

exports.setNewDay = async(group) => {
    const users = await User.find({group_id: group});
    users.forEach((i)=>{
        User.updateOne({_id: i._id}, {newDay: true}).then(()=>{console.log('reset new day success!')});
    })    
    
}

exports.setNewWeek = async(group) => {
    const users = await User.find({group_id: group});
    users.forEach((i)=>{
        User.updateOne({_id: i._id}, {newWeek: true}).then(()=>{console.log('reset new week success!')});
    })
}

exports.setMedals = async() => {
    const users = await User.find();
    users.forEach((i)=>{
        User.updateOne({_id: i._id}, {medals: [false,false,false,false]}).then(()=>{console.log('reset medals success!')});
    })
}
