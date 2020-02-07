const Conf = require('conf');
const path = require('path');
const crypto = require('crypto');
module.exports = function () {
    const config = new Conf({
        projectName: 'projectQuery'
    });
    return {
        createOrUpdate: function (path) {
            var list = config.get('list');
            list = list === undefined ? [] : list;
            list = list.filter(function (e) {
                return e.path !== path;
            })
            list.unshift({
                path: path,
                exec: null,
                class:[],
                id:crypto.createHash('sha1').update(path).digest('hex')
            });
            config.set('list', list);
        },
        getList:function(selector){
            var list = config.get('list');
            if(list === undefined){
                console.error(`Project doesn't exist yet.`);
                process.exit(require('./exit-code').PROJECT_DOES_NOT_EXISTS_YET);
            }
            if(selector.type === 'directory'){
                var realPath = path.resolve(selector.value);
                list = list.filter((e)=>(e.path.indexOf(realPath)>-1 ? true : false));
            }
            return list;
        },
        convertHistoryObj:function(data){
            var list = config.get('list');
            return data.map((e)=>list.filter((f)=>f.path === e ? true : false)[0]);
        },
        print:function(list){
            var Table = require('cli-table3');
            var table = new Table({
                head: ['num', 'id', 'path', 'class']
            });
            for (var i = 0; i < list.length; i++) {
                var _num = i;
                var _id = list[i].id.substr(0,7);
                // var _path = truncate(list[i].path,60,'...');
                var _path = list[i].path;
                _path = reducePathString(_path);
                var _class = list[i].class;
                table.push([_num, _id, _path, _class]);
            }
            console.log(table.toString());
        },
        printWEB:function(list){
            var web = require('./web');
            web.list(list);
        }
    }
}

function reducePathString(_path) {
    if (_path.length > 50) {
        var _paths = _path.split('/');
        var _newPath = [_paths[1], _paths[2], '...', _paths[_paths.length - 2], _paths[_paths.length - 1]];
        _path = _newPath.join('/');
    }
    return _path;
}
