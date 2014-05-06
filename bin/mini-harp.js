#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2)),
    createMiniHarp = require("../"),
    app = createMiniHarp(args._[0]);
console.log("Starting mini-harp on http://localhost:"+args.port);

app.listen(args.port);
