#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2)),
    createMiniHarp = require("../"),
    port = args.port||4000,
    app = createMiniHarp(args._[0]||"../verify/asserts");
console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);
