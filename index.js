var connect = require('connect'),
    serveStatic = require('serve-static');

module.exports = function(path){
  var app = connect();
  // why it should move to be in front of use function...?
  // because if not it will be filted by else..
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
    }
  });
  return app;
};
