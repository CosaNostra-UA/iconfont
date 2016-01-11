'use strict';


var $ = require('jquery');
/*var fs = require('fs');*/

$('document').ready(function() {
    var selection = $('#selection');
    var fontField = $('#font-field');
    var font = $('#font');
    var iconsField = $('#icons-field');
    var form = $('#form');
    var download = $('#download');
    var content = {};

    $('body').on('click', '.icon', function(){
        $(this).toggleClass('selected');
    });

    selection.click(function() {
        selection.addClass('selected');
        font.removeClass('selected');
        iconsField.show();
        $('#font-field').hide();
    });

    font.click(function() {
        font.addClass('selected');
        selection.removeClass('selected');
        iconsField.hide();
        fontField.show();
        download.show();
        form.empty();

        $('div.selected').each(function(){
            var html =  '<div class="cell"><span>' +  $(this).children().text() + '</span>' +
                        '<input type="text" name="name-icon" value="' + $(this).data('name') + '"> </br>' +
                        '<input type="text" name="code-icon" value="' + $(this).data('code') + '" class="code">' +
                        '<input type="hidden" name="name-file" value="' + $(this).data('namefile') + '">' +
                        '</div>';
            form.append(html);
        });
    });

    download.click(function() {
        $('.cell').each(function() {
            var key = $('input[name="name-file"]');
            var name = $('input[name="name-icon"]');
            var code = $('input[name="code-icon"]');
            content[key] = {"unicode": [code], "name": name};
        });

    });
});


