'use strict';


var $  = require('jquery');
var fs = require('browserify-fs');

$('document').ready(function() {
    var $selection = $('#selection');
    var $fontField = $('#font-field');
    var $font = $('#font');
    var $iconsField = $('#icons-field');
    var $form = $('#form');
    var $download = $('#download');

    $('body').on('click', '.icon', function(){
        $(this).toggleClass('selected');
    });

    $('body').on('click', '.remove', function(event) {
        var fileName = $(event.target).siblings('input[name="name-file"]').val();
        $('div[data-namefile="' + fileName + '"]').removeClass('selected');
        $(event.target).parent().remove();
    });

    $selection.click(function() {
        $selection.addClass('selected');
        $font.removeClass('selected');
        $iconsField.show();
        $download.hide();
        $('#font-field').hide();
    });

    $font.click(function() {
        $font.addClass('selected');
        $selection.removeClass('selected');
        $iconsField.hide();
        $fontField.show();
        $download.show().removeClass('selected');
        $form.empty();

        $('div.selected').each(function(){
            var html =  '<div class="cell"><span>' +  $(this).children().text() + '</span>' +
                        '<input type="text" name="name-icon" value="' + $(this).data('name') + '">' +
                        '<p class="remove">&#x00D7</p></br>' +
                        '<input type="text" name="code-icon" value="' + $(this).data('code') + '" class="code">' +
                        '<input type="hidden" name="name-file" value="' + $(this).data('namefile') + '">' +
                        '</div>';
            $form.append(html);
        });
    });

    $download.click(function() {
        $download.addClass('selected');
        var content = {};

        $('.cell').each(function(index, elem) {
            var key = $(elem).children('input[name="name-file"]').val();
            var name = $(elem).children('input[name="name-icon"]').val();
            var code = $(elem).children('input[name="code-icon"]').val();
            content[key] = {"unicode": [code], "name": name};
        });

        //var fontName = $('input[name="name-font"]').val();

        fs.writeFile('inputData.json', JSON.stringify(content), function() {
            fs.readFile('../inputData.json', 'utf-8', function(err, data) {
                console.log(err, data);
            });
        });
    });
});




window.jQuery =  $;