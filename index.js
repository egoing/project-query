#!/usr/bin/env node
'use strict';
const meow = require('meow');
const cli = meow(`
    Usage
      $ projectQuery 
      $ projectQuery [directory] mode [project name]
      $
 
    Options
      --rainbow, -r  Include a rainbow
 
    Examples
      $ foo unicorns --rainbow
      🌈 unicorns 🌈
`, {
    flags: {
        add: {
            alias: 'a'
        }
    }
});
console.log(cli);

var directory = require('./directory')(cli);
var path = require('path');
if(cli.flags.add){
    var basePath = directory.getBasePath();
    var dirname = directory.getDirName();
    var fullPath = path.join(basePath,dirname);
    directory.createDirectory(fullPath);
}
console.log(fullPath);