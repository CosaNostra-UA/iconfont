/**
 * Created by m_tsymbal on 1/27/16.
 */

var fs = require("fs");

module.exports = function(){
    var code = 0xEA01;
    var content = {};

    fs.readdir(__dirname + '/../../icons-library/', function(err, items){
        items.map(function(dir) {
            fs.readdir(__dirname + '/../../icons-library/' + dir, function(err, files){
                files = files || [];
                files.forEach(function(data){
                    content[dir + '/' + data] = {
                    unicode: (code++).toString(16).toUpperCase(),
                    name: data.slice(0, -4)
                    };
                 });
            });
        });
        setTimeout(function(){
            fs.writeFile('src/baseData.json', JSON.stringify(content, null, '\t'));
        }, 1000)
    });
};