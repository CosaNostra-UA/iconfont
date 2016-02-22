/**
 * Created by m_tsymbal on 1/21/16.
 */
var font       = require('./fontGenerator.js');
var css        = require('./cssGenerator.js');

module.exports = function (config, inputData) {
    return font(config.fontFamily, inputData)
        .pipe(css({
            config: config,
            inputData: inputData
        }));
};