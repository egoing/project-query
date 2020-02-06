const fs = require('fs');
const os = require('os');
module.exports = function (cli) {
    return {
        getRandomDirName: function () {
            const city = require('./city');
            const dir1 = city[Math.floor(city.length * Math.random())];
            const dir2 = city[Math.floor(city.length * Math.random())];
            return dir1 + '-' + dir2;
        },
        getDirName: function () {
            var dirname = '';
            if (cli.flags.add === true) {
                dirname = this.getRandomDirName();
            } else {
                dirname = cli.flags.add;
            }
            return dirname;
        },
        getBasePath: function(){
            if(cli.input.length>0){
                var basePath = cli.input[0];
            } else {
                var basePath = this.getTempPath();
            }
            return basePath;
        },
        getTempPath: function () {
            const tempDirectorySymbol = Symbol.for('__RESOLVED_TEMP_DIRECTORY__');
            if (!global[tempDirectorySymbol]) {
                Object.defineProperty(global, tempDirectorySymbol, {
                    value: fs.realpathSync(os.tmpdir())
                });
            }
            return global[tempDirectorySymbol];
        },
        createDirectory: function (newDirName) {
            if (!fs.existsSync(newDirName)) {
                fs.mkdirSync(newDirName);
            } else {
                throw new Error('Directory already exists.');
            }
        }
    }
}