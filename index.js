var connect = require('connect'),
    serveStatic = require('serve-static'),
    jade = require("./lib/processor/jade"),
    less = require("./lib/processor/less");
module.exports = function(root){
  var app = connect();
  app.use(function(req,res,next){
    //var url = req.url.split("/");
    if(req.url == "/" || req.url == ""){
      req.url = "/index.html";
      next();
    }
    else if(req.url == "/current-time"){
      res.end((new Date()).toISOString()+"\n");
    }
    else{
      //res.end("Cannot Get "+req.url.substr(req.url.indexOf('/')));
      next();
      // if we not use next(), then if we write .use below, it will be useless.
      // it will stuck in else
    }
  })
    .use(jade(root))
    .use(less(root))
    .use(serveStatic(root));
  return app;
};
