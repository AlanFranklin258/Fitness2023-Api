
exports.timestampFree = (offsetDay)=>{
    return new Date(new Date().setDate(new Date().getDate() + offsetDay));
}

exports.timeString = (date)=>{
    var temp = date.toString().split(' ');
    return temp[0] + '-' + temp[1] + '-' + temp[2] + '-' + temp[3];
}