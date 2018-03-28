# logger for node
simple logger supports different colors

![Alt text](https://github.com/yuanxiaosi/node-express-logger/raw/master/screenshots/1.png)

![Alt text](https://github.com/yuanxiaosi/node-express-logger/raw/master/screenshots/2.png)

# Installation
npm i --save node-express-logger


# Usage
```
var logger = require("node-express-logger");
logger.config({
	logFilePath: "./log",
	logFileName: "name.log"
})

logger.Warn("123123")  
logger.Warn({a:1, b:2, c:[1,2,3]})  

logger.Info("123123")  
logger.Debug("123123")  
logger.Warn("123123")  
logger.Error("123123")  
logger.Trace("123123")  
```



