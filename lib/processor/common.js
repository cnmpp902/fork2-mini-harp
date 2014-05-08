var path = require('path'),
    fs = require('fs');

module.exports = makeCommon;

function makeCommon(root,showStyle,hideStyle,callback) {
  function notFound(req,res){//for 404
    res.statusCode = 404;
    res.end("Cannot Get "+req.url.substr(req.url.indexOf('/')));
  }
  function directlyShow(res,data){// instead of server-static
    res.writeHead(200,{
      'Content-Length': data.length,
      'Content-Type': 'text/'+showStyle.split('.')[1]+'; charset=UTF-8'
    });
    res.end(data);    
  }
  return function(req,res,next){    
    //res.statusCode = 200;
    if(path.extname(req.url)==showStyle){
      var commonFile = path.join(root,req.url);
      fs.readFile(commonFile,{encoding: "utf-8"},function(err,data){
	if(err){
	  commonFile=commonFile
	    .substr(0,commonFile.length-path.extname(req.url).length)+hideStyle;
	  fs.readFile(commonFile,{encoding: "utf-8"},function(err,data){
	    if(err){// not found 
	      //next();
	      // we can end it here
	      notFound(req,res);
	    }
	    else{ //have hideStyle file
	      callback(res,data);
	    }
	  });	  
	}
	else{// hava showStyle file 
	  //use static-server to show it 
	  //next();
	  // also , we can show it in  here
	  directlyShow(res,data);
	}
      });
    }
    else if(path.extname(req.url) == hideStyle){
      notFound(req,res);
    }
    else{
      next();
    }
  };
}
