var exec = require('child_process').exec;
module.exports = {
    run: function (cmd) {
        cmd.forEach(function (e) {
            exec(e, (error, stdout, stderr) => {
                if (stdout) {
                    console.log('\x1b[33m'+stdout+'\x1b[0m');
                }
                if (stderr) {
                    console.error('\x1b[32m'+e,'\x1b[31m=>',stderr,'\x1b[0m');
                }
            })
        });
    },
    plan: function(dirs, cmd){
        return dirs.map(function (e) {
            var new_cmd = cmd.replace(/{}/g, `"${e}"`);
            new_cmd = `cd ${e};`+new_cmd;
            return new_cmd;
        });
    }
}