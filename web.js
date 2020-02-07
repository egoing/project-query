var open = require('open');
module.exports = {
    list: function (list) {
        var http = require('http');
        var app = http.createServer(function (request, response) {
            var url = request.url;
            var rows = [];
            for (var i = 0; i < list.length; i++) {
                var _num = i;
                var _id = list[i].id.substr(0, 7);
                var _path = list[i].path;
                var _class = list[i].class;
                rows.push(`
                    <tr>
                        <td>${_num}</td>
                        <td>${_id}</td>
                        <td>${_path}</td>
                        <td>${_class}</td>
                    </tr>
                `);
            }
            response.writeHead(200);
            response.end(
                `
                <html>
                    <body>
                        <table>
                        ${rows.join('')}
                        </table>
                    </body>
                </html>
                `
            );
        });
        app.listen(3000);
    }
}