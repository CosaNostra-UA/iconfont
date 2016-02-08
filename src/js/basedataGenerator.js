/**
 * Created by m_tsymbal on 1/27/16.
 */

var fs       = require("fs");
var srcIcons = require('../config.json').srcIcons;

module.exports = function(){
    var code = 0xEA01;
    var content = {};

    fs.readdir(srcIcons, function(err, files){
        files.forEach(function(data){
            content[data] = {
                unicode: (code++).toString(16).toUpperCase(),
                name: data.slice(0, -4)
            };
        });
        fs.writeFile('src/baseData.json', JSON.stringify(content, null, '\t'));
    });
};