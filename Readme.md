# logger for node
simple logger


# Installation
npm i --save node-express-logger


# Usage
```
var logger = require("node-express-logger");
logger.config({
	logFilePath: "./log",
	logFileName: "name.log"
})

log.Warn("123123")  
log.Warn({a:1, b:2, c:[1,2,3]})  

log.Info("123123")  
log.Debug("123123")  
log.Warn("123123")  
log.Error("123123")  
log.Trace("123123")  
```



