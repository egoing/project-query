#!/usr/bin/env node

'use strict';
const meow = require('meow');
const cli = meow(`
    Usage
      $ projectQuery [selector] [--exec command]
      $ projectQuery [selector] option [project name] [--exec command]
      $ 
 
    Options
      --add, -a  create or registe project
      --list, -l    show project list
      --exec,
      --GUI
 
    Examples
      $ foo unicorns --rainbow
      🌈 unicorns 🌈
`, {
    flags: {
        add: {
            alias: 'a'
        },
        list: {
            alias: 'l'
        }
    }
});
var history = require('./history')();
var directory = require('./directory')(cli);
var selector = require('./selector');
var workedDir = [];
var fullPath = null;
if (cli.flags.add) {
    fullPath = directory.createDirectory(fullPath);
    history.createOrUpdate(fullPath);
    workedDir.push(fullPath);
    console.log('created directory '+fullPath);
} else if (cli.flags.gui) {
    var selected_selector = selector.get(cli.input);
    var list = history.getList(selected_selector);
    history.printWEB(list);
} else {
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