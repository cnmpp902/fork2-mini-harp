var less = require('less'),
    makeCommon = require('./common.js');

module.exports = makeLess;

function makeLess(root) {
    return makeCommon(root,".css",".less",function(res,data){
      less.render(data, function (e, css) {
	res.writeHead(200, {
	  'Content-Length': css.length,
	  'Content-Type': 'text/css; charset=UTF-8'
	});
	res.end(css);
      });
    });
}
