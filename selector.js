var fs = require('fs');
module.exports = {
    get:function(input){
        var selector;
        if(input.length === 0){
            selector = {type:'all', value:null}
        } else if(input.length === 1){
            if(!this.isExistPath(input[0])){
                throw `${input[0]} is a nonexistent directory`;
            }
            selector = {type:'directory', value:input[0]}
        } else if(input.length === 2){
            if(['id', 'class'].indexOf(input[0]) === -1){
                throw "Selector must be id or class."
            }
            selector = {type:input[0], value:input[1]}
        }
        return selector;
    },
    isExistPath: function(dir_path){
        if (fs.existsSync(dir_path)) {
            return true;
        } else {
            return false;
        }
    }
}