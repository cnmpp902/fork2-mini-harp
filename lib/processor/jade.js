var path = require('path'),
    jade = require('jade'),
    fs = require('fs');

module.exports = makeJade;

function makeJade(root) {
  // TODO
  var options = {};
  return function(req,res,next){    
    var jadeFile = path.join(root ,req.url);
    //res.statusCode = 200;
    if(path.extname(req.url)==".html"){
      fs.readFile(jadeFile,{encoding: "utf-8"},function(err,data){
	if(err){// for jade
	  jadeFile = jadeFile.substr(0,jadeFile.length-path.extname(req.url).length)+".jade";
	  fs.readFile(jadeFile,{encoding: "utf-8"},function(err,data){
	    if(err){// not found
	      //res.statusCode = 404;
	      next();
	    }
	    else{
	      res.writeHead(200, {
		'Content-Length': jade.render(data,options).length,
		'Content-Type': 'text/html; charset=UTF-8'
	      });
	      res.end(jade.render(data,options));
	    }
	  });	  
	}
	else{
	  //for html
	  res.writeHead(200, {
	    'Content-Length': data.length,
	    'Content-Type': 'text/html; charset=UTF-8'
	  });	  
	  res.end(data);
	}
      });
    }
    else if(path.extname(req.url)==".jade"){
      res.statusCode = 404;
      res.end();
    }
    else{
      next();
    }
  };
}
