'use strict';


var $  = require('jquery');

$('document').ready(function() {
    var $selection = $('#selection');
    var $fontField = $('#font-field');
    var $font = $('#font');
    var $iconsField = $('#icons-field');
    var $form = $('#edit-data');
    var $download = $('#download');

    $('body').on('click', '.icon', function(){
        $(this).toggleClass('selected');
    });

    $('body').on('click', '.remove', function(event) {
        var fileName = $(event.target).siblings('input[name="name-file"]').val();
        $('div[data-namefile="' + fileName + '"]').removeClass('selected');
        $(event.target).parent().remove();
    });

    $iconsField.selectable({
        filter: 'div.icon',
        selected: function( event, ui ) {
            $(ui.selected).toggleClass('selected');
        }
    });

    $selection.click(function() {
        $selection.addClass('button-selected');
        $font.removeClass('button-selected');
        $iconsField.show();
        $('#font-field').hide();

        $('div.cell').each(function(){
            var current = $(this).children('input[name="name-file"]').val();
            var searchElem = $('div[data-namefile="' + current + '"]');
            searchElem.data('name', $(this).children('input[name="name-icon"]').val());
            searchElem.data('code', $(this).children('input[name="code-icon"]').val());
        });
    });

    $('h1').click(function() {
        if ( $(this).hasClass('check') ) {
            $(this).removeClass('check');
            $(this).children('.arrow').text(String.fromCodePoint(parseInt('25bd', 16)));
            $(this).siblings('.set-icons').show();
            return;
        }
        $(this).addClass('check');
        $(this).children('.arrow').text(String.fromCodePoint(parseInt('25b7', 16)));
        $(this).siblings('.set-icons').hide();
    });

    $font.click(function() {
        $font.addClass('button-selected');
        $selection.removeClass('button-selected');
        $iconsField.hide();
        $fontField.show();
        $download.removeClass('button-selected');
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

    $('#show-config').click(function(){
        var content = getContent();
        var showConfig = window.open("");
        showConfig.document.write('<title>Font-config</title><div>' + JSON.stringify(content) + '</div>');
    });

    $download.click(function() {
        $download.addClass('button-selected');
        var fontName = $('input[name="name-font"]').val();
        var content = getContent();

        if( content === 'invalid data' ) return;

        $.ajax({
            url: '/generate-font',
            type: 'post',
            dataType: 'json',
            data: {
                fontName: fontName,
                inputData: content
            },
            success: function(data, status, xhr) {
                window.location.href = xhr.getResponseHeader('Location') + '/' + fontName + '.zip';
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Response Error: ' + xhr.status + ' ' + thrownError);
            }
        });
    });

    function getContent(){
        var content = {};
        var inValidData = false;

        $('.cell').each(function(index, elem) {
            var key = $(elem).children('input[name="name-file"]').val();
            var name = $(elem).children('input[name="name-icon"]').val();
            var unicode = $(elem).children('input[name="code-icon"]').val();
            if( unicode.search(/[^a-f0-9\s]/i) !== -1 ){
                alert('Please, enter unicode in hex');
                inValidData = true;
            }
            content[key] = {"unicode": unicode, "name": name};
        });

        if( inValidData ) {
            return 'invalid data';
        }

        return content;
    }
});




window.jQuery =  $;