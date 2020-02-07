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
if (cli.flags.add) {
    var fullPath = directory.createDirectory();
    history.createOrUpdate(fullPath);
    workedDir.push(fullPath);
    console.log('created directory ' + fullPath);
} else if (cli.flags.gui) {
    var selected_selector = selector.get(cli.input);
    var list = history.getList(selected_selector);
    history.printWEB(list);
} else {
    var selected_selector = selector.get(cli.input);
    var list = history.getList(selected_selector);
    workedDir = list.map(function (e) {
        return e.path;
    });
    history.print(list);
}
if (cli.flags.exec) {
    var exec = require('./exec');
    var workedDir = history.convertHistoryObj(workedDir);
    var plan = exec.plan(workedDir, cli.flags.exec);
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("")
    for (var i = 0; i < plan.length; i++) {
        var group = '\x1b[32m' + plan[i].path + '\x1b[0m'
        console.group(group);
        console.log(`cd ${plan[i].path}`);
        console.log(plan[i].cmd.replace(';', '\n').replace('&&', '\n'));
        console.groupEnd(group);
        console.log('')
    }
    rl.question("Do you want to run these command? \x1b[33m\x1b[1m[y|N]\x1b[0m", function (answer) {
        if (['Y', 'y', 'yes'].indexOf(answer) === -1) {

        } else {
            exec.run(plan);
        }
        rl.close();
    });
}