var exec = require('child_process').exec;
module.exports = function (dirs, cmd) {
    dirs.forEach(function (e) {
        var new_cmd = cmd.replace('{}', `"${e}"`);
        new_cmd = `cd ${e}; `+new_cmd;
        exec(new_cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
            }
            if (stdout) {
                console.log(stdout);
            }
            if (stderr) {
                console.error(stderr);
            }
        })
    });
}