module.exports = function () {
    const Conf = require('conf');
    const config = new Conf({
        projectName: 'projectQuery'
    });
    return {
        createOrUpdateHistory: function (path) {
            var list = config.get('list');
            list = list === undefined ? [] : list;
            list = list.filter(function (e) {
                return e.path !== path;
            })
            list.unshift({
                path: path,
                exec: null
            });
            config.set('list', list);
        }
    }
}