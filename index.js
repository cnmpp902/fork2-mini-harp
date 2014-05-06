var connect = require('connect'),
    serveStatic = require('serve-static');

module.exports = function(path){
  var app = connect();
  if(path !== undefined){
    app.use(serveStatic(path));
  }
  app.use(function(req,res,next){
    var url = req.url.split("/");
    if(url[1] == "current-time" && url[2] === undefined){
      res.end((new Date()).toISOString()+"\n");
    }
    else{
      //res.end("Cannot Get "+req.url.substr(req.url.indexOf('/')));
      next();

      // if we not use next(), then if we write .use below, it will be useless.
      // it will stuck in else
    }
  });
  return app;
};
