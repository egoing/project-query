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
var history = require('./history')();
var directory = require('./directory')(cli);
if (cli.flags.add) {
    var fullPath = directory.createDirectory(fullPath);
    history.createOrUpdateHistory(fullPath);
}
console.log(fullPath);