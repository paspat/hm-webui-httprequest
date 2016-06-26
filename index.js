var http = require('http');
var urlHelper = require('url');

var HTTPRequestPlugin  = function(options){
    var log = null;

    this.logger = function(logger){
        log = logger;
    }

    this.get = function(url,callback){
        var options = urlHelper.parse(url);
        log.debug("Call http get with options - " + JSON.stringify(options));
        var req = http.request(options,function(response){
            var body = "";
            
            response.on('data',function(d){
                body+=d;
            });
            
            response.on('end',function(){
                var resBody = body;

                if(response.headers && response.headers['content-type'] && response.headers['content-type'].indexOf("application/json")>=0)
                    resBody=JSON.parse(resBody);
                    
                callback(response.statusCode,response.headers,resBody);
            });
        });
        
        req.end();
    }

}

module.exports = HTTPRequestPlugin;