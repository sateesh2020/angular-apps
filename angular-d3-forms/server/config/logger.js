var winston     = require('winston');
var fs          = require('fs');
var dir         = './logs';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
winston.emirErrs = true;

var logger = new winston.Logger({
  transports:[
    new winston.transports.File({
      level:'info',
      filename:'./logs/all-logs.log',
      handleExceptions:true,
      json:true,
      maxsize:2048,
      maxFiles:3,
      colorize:false
    }),
    new winston.transports.Console({
      level:'debug',
      handleExceptions:true,
      json:false,
      colorize:true
    })
  ],
  exitOnError:false
})
module.exports = logger;
module.exports.stream = {
  write:function(message, encoding){
    logger.info(message);
  }
}