#!/usr/bin/env node

'use strict';
const meow = require('meow');
const cli = meow(`
    Usage
      $ projectQuery [selector] [--exec command]
      $ projectQuery [selector] mode [project name] [--exec command]
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
        },
        list: {
            alias: 'ls'
        }
    }
});
console.log(cli.flags, cli.input);
var history = require('./history')();
var directory = require('./directory')(cli);
var selector = require('./selector');
var workedDir = [];
var fullPath = null;
if (cli.flags.add) {
    fullPath = directory.createDirectory(fullPath);
    history.createOrUpdate(fullPath);
    workedDir.push(fullPath);
} else {
    // {type:'directory, class, id', value:''}
    var selected_selector = selector.get(cli.input);
    var list = history.getList(selected_selector);
    workedDir = list.map(function(e){
        return e.path;
    });
    history.print(list);
} 
if (cli.flags.exec){
    require('./exec')(workedDir, cli.flags.exec);
}