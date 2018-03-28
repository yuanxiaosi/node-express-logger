var log = require("./index.js");
log.config({
	logFilePath: "./log/",
	logFileName: "name.log"
})

log.Info({a:1, b:2, c:[1,2,3]})
function aa(cb) {
  log.Warn("123123")
  cb(bb);
}

aa(function(cb){
  log.Error("123123")
  cb()
});

function bb(){
	log.Debug("123123")
}


