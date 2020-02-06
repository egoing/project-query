var exec = require('child_process').exec;
module.exports = function (dirs, cmd) {
    dirs.forEach(function (e) {
        exec(`cd ${e}&&`+cmd, (error, stdout, stderr) => {
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