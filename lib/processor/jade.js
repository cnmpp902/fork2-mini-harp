var jade = require('jade'),
    makeCommon = require('./common.js');

module.exports = makeJade;

function makeJade(root) {
  var options = {};
  return makeCommon(root,".html",".jade",function(res,data){
    res.writeHead(200, {
      'Content-Length': jade.render(data,options).length,
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end(jade.render(data,options));	
  });
}
