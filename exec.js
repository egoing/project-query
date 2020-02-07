var exec = require('child_process').execSync;
module.exports = {
    run: function (plan) {
        plan.forEach(function (e) {
            console.group('\x1b[32m'+e.path+'\x1b[0m');
            try{
                var result = exec(`cd ${e.path};${e.cmd}`).toString();
            }catch(e){
                // console.log(e.stderr.toString());
            }
            if(result)
                console.log(result);
            console.groupEnd('\x1b[32m'+e.path+'\x1b[0m');
        });
    },
    plan: function(dirs, cmd){
        return dirs.map(function (e) {
            var new_cmd = cmd.replace(/{}/g, `"${e.path}"`);
            return {...e, cmd:new_cmd};
        });
    }
}