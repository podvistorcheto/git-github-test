const timeNow = require('moment')

//logg time and date current
const logger = function(request, response, next){
    console.log(`${request.protocol}://${request.get('host')}${request.originalUrl}:${timeNow().format()}`);
    next();
}

module.exports = logger;

