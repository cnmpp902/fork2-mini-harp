var path = require('path'),
    less = require('less'),
    fs = require('fs');

module.exports = makeLess;

function makeLess(root) {
  // TODO
  var options = {};
  return function(req,res,next){    
    var lessFile = path.join(root ,req.url);
    //res.statusCode = 200;
    if(path.extname(req.url)==".css"){
      fs.readFile(lessFile,{encoding: "utf-8"},function(err,data){
	if(err){// for less
	  lessFile = lessFile.substr(0,lessFile.length-path.extname(req.url).length)+".less"; //css length 3
	  fs.readFile(lessFile,{encoding: "utf-8"},function(err,data){
	    if(err){// not found
	      //res.statusCode = 404;
	      next();
	    }
	    else{
	      less.render(data, function (e, css) {
		res.writeHead(200, {
		  'Content-Length': css.length,
		  'Content-Type': 'text/css; charset=UTF-8'
		});
		res.end(css);
	      });	      
	    }
	  });	  
	}
	else{
	  //for css
	  res.writeHead(200, {
	    'Content-Length': data.length,
	    'Content-Type': 'text/css; charset=UTF-8'
	  });
	  res.end(data);
	}
      });
    }
    else if(path.extname(req.url)==".less"){
      res.statusCode = 404;
      res.end();
    }
    else{
      next();
    }
  };
}
