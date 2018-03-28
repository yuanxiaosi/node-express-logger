var log = require("./index.js");
log.Warn({a:1, b:2, c:[1,2,3]})
function aa(cb) {
  log.Warn("123123")
  cb(bb);
}

aa(function(cb){
  log.Warn("123123")
  cb()
});

function bb(){
	log.Warn("123123")
}
