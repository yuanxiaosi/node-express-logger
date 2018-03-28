var fs = require('fs');
var path = require('path');

var Logger = function(){
  this.logFilePath = "./log/";
  this.logFileName = "log.log";
  this.type = ['INFO', 'DEBUG', 'WARNING', 'ERROR', 'TRACE'];
}

Logger.prototype.config = function(data){
  console.log(data)
  this.logFilePath = data.logFilePath;
  this.logFileName = data.logFileName;
}

Logger.prototype.Info = function(){ this.log("INFO", arguments); }
Logger.prototype.Debug = function(){ this.log("DEBUG", arguments); }
Logger.prototype.Warn = function(){ this.log("WARNING", arguments); }
Logger.prototype.Error = function(){ this.log("ERROR", arguments); }
Logger.prototype.Trace = function(){ this.log("TRACE", arguments); }

Logger.prototype.getPos = function(){
  var cwd = process.cwd() + '/';
  try {
    throw new Error();
  } catch(e) {
    var eMsg = e.stack.split('\n')[4];
    if(eMsg.indexOf('(') >= 0 || eMsg.indexOf(')') >= 0 ){
      var pos = eMsg.match(/\(.+\)/)[0]
      pos = pos.substring(1,pos.length-1).split(':')
    }else{
      var spLen = eMsg.split(' ').length;
      var pos = eMsg.split(' ')[spLen-1].split(':');
    }
    return ' [' + pos[0].replace(cwd, '') + ':' + pos[1] + ':' + pos[2] + '] ';
  }
}

Logger.prototype.getNowTime = function(){
  var nowDate = new Date();
  var nowDateObj = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth()+1,
    day: nowDate.getDate(),
    hour: nowDate.getHours(),
    minute: nowDate.getMinutes(),
    second: nowDate.getSeconds()
  }
  for (var i in nowDateObj){
    // if(i == 'year'){ continue; }
    if(parseInt(nowDateObj[i]) < 10){
      nowDateObj[i] = '0' + nowDateObj[i];
    }
  }

  return {
    nowDay: nowDateObj.year + nowDateObj.month + nowDateObj.day,
    nowTime: nowDateObj.year + '-' + nowDateObj.month + '-' + nowDateObj.day + " " + nowDateObj.hour + ':' + nowDateObj.minute + ':' + nowDateObj.second + ' '
  }
}

Logger.prototype.log = function(type, arguments){
  var msg = "";
  for(var i in arguments){
    var res = JSON.stringify(arguments[i]);
    res += "--";
    msg += res;
  }
  var nowTime = this.getNowTime().nowTime;
  var nowDay = this.getNowTime().nowDay;
  var msgType = "[" + type + "]";
  var pos = this.getPos(); 

  var commandLogData = nowTime + msgType + pos + msg
  var w_data = commandLogData + '\r\n\r\n';
  this.commandLog(type, commandLogData)


  var w_data = new Buffer(w_data);
  var url = this.logFilePath + this.logFileName + '_' + nowDay;
  
  if(!fs.existsSync(this.logFilePath)){
    fs.mkdirSync(this.logFilePath)
  }
  fs.writeFile(url, w_data, {flag: 'a'}, function (err) {
    if(err) {
      console.log(this.logFileName + '_' + nowDay +'写入失败');
    }
  });
}

Logger.prototype.commandLog = function(type, data){ //命令行输出 和颜色区分
  var styles = {  
    'bold'          : ['\x1B[1m',  '\x1B[22m'],  
    'italic'        : ['\x1B[3m',  '\x1B[23m'],  
    'underline'     : ['\x1B[4m',  '\x1B[24m'],  
    'inverse'       : ['\x1B[7m',  '\x1B[27m'],  
    'strikethrough' : ['\x1B[9m',  '\x1B[29m'],  
    'white'         : ['\x1B[37m', '\x1B[39m'],  
    'grey'          : ['\x1B[90m', '\x1B[39m'],  
    'black'         : ['\x1B[30m', '\x1B[39m'],  
    'blue'          : ['\x1B[34m', '\x1B[39m'],  
    'cyan'          : ['\x1B[36m', '\x1B[39m'],  
    'green'         : ['\x1B[32m', '\x1B[39m'],  
    'magenta'       : ['\x1B[35m', '\x1B[39m'],  
    'red'           : ['\x1B[31m', '\x1B[39m'],  
    'yellow'        : ['\x1B[33m', '\x1B[39m'],  
    'whiteBG'       : ['\x1B[47m', '\x1B[49m'],  
    'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],  
    'blackBG'       : ['\x1B[40m', '\x1B[49m'],  
    'blueBG'        : ['\x1B[44m', '\x1B[49m'],  
    'cyanBG'        : ['\x1B[46m', '\x1B[49m'],  
    'greenBG'       : ['\x1B[42m', '\x1B[49m'],  
    'magentaBG'     : ['\x1B[45m', '\x1B[49m'],  
    'redBG'         : ['\x1B[41m', '\x1B[49m'],  
    'yellowBG'      : ['\x1B[43m', '\x1B[49m']  
  };  

  // console.log('\x1B[36m%s\x1B[0m', "info");
  // console.log('\x1B[33m%s\x1b[0m:', "path");

  // console.log("\x1B[1m", "1m")
  // console.log("\x1B[3m", "3m")
  // console.log("\x1B[4m", "4m")
  // console.log("\x1B[7m", "7m")
  // console.log("\x1B[9m", "9m")
  // console.log("\x1B[37m", "37m")
  // console.log("\x1B[90m", "90m")
  // console.log("\x1B[30m", "30m")
  // console.log("\x1B[34m", "34m")
  // console.log("\x1B[36m", "36m")
  // console.log("\x1B[32m", "32m")
  // console.log("\x1B[35m", "35m")
  // console.log("\x1B[31m", "31m")
  // console.log("\x1B[33m", "33m")
  // console.log("\x1B[47m", "47m")
  // console.log("\x1B[49;5;8m", "49;5;8m")
  // console.log("\x1B[40m", "40m")
  // console.log("\x1B[44m", "44m")
  // console.log("\x1B[42m", "42m")
  // console.log("\x1B[45m", "45m")
  // console.log("\x1B[41m", "41m")
  // console.log("\x1B[43m", "43m")
  // console.log("--------------------------")

  switch (type){
    case "INFO":
      console.log("\x1B[37m%s\x1B[0m", data)
      break;
    case "DEBUG":
      console.log("\x1B[36m%s\x1B[0m", data)
      break;
    case "WARNING":
      console.log("\x1B[33m%s\x1B[0m", data)
      break;
    case "ERROR":
      console.log("\x1B[31m%s\x1B[0m", data)
      break;
    case "TRACE":
      console.log("\x1B[31m%s\x1B[0m", data)
      break;
  }
}

var logger = new Logger();

module.exports = logger;