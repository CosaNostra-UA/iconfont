'use strict';


var $  = require('jquery');

$('document').ready(function() {
    var $body        = $('body');
    var $selection   = $('#selection');
    var $fontField   = $('#font-field');
    var $font        = $('#font');
    var $iconsField  = $('#icons-field');
    var $form        = $('#edit-data');
    var $download    = $('#download');

    $.ajax({
        url: '/icons',
        type: 'get',
        success: function() {
            $('style').append("@font-face{ \n" +
                "font-family:basefont; \n" +
                "src:url('fonts/basefont.eot'); \n" +
                "src:url('fonts/basefont.eot?#iefix') format('embedded-opentype') , \n" +
                    "url('fonts/basefont.woff') format('woff'), \n" +
                    "url('fonts/basefont.woff2') format('woff2'), \n" +
                    "url('fonts/basefont.ttf') format('truetype'), \n" +
                    "url('fonts/basefont.svg') format('svg'); \n" +
            "}");

            $('div.icon').each(function(){
                $(this).children('img').hide();
                var html = '<p>&#x' + $(this).data('code') + '</p>';
                $(this).append(html);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Response Error: ' + xhr.status + ' ' + thrownError);
        }
    });

    $body.on('click', '.icon', function(){
        $(this).toggleClass('selected');
    });

    $body.on('click', '.remove', function(event) {
        var fileName = $(event.target).siblings('input[name="name-file"]').val();
        $('div[data-namefile="' + fileName + '"]').removeClass('selected');
        $(event.target).parent().remove();
    });

    $body.on('keyup', 'input[name="code-icon"]', function() {
        var value = $(this).val();

        if(value.search(/[^a-f0-9]|^$/i) !== -1){
            $(this).addClass('invalid-data');
            return;
        }

        if( !window.chrome && !window.sidebar ) {
            return;
        }

        value = String.fromCodePoint(parseInt(value, 16));
        $(this).removeClass('invalid-data');
        $(this).siblings('input[name="view-code"]').val(value);
    });

    $body.on('keyup', 'input[name="view-code"]', function() {
        if( !window.chrome && !window.sidebar ) {
            return;
        }

        var value = $(this).val();

        if( value === '' ) {
            return;
        }

        value = value.codePointAt(0).toString(16);
        $(this).siblings('input[name="code-icon"]').val(value).removeClass('invalid-data');
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
            var html =  '<div class="cell"><div class="ibkg"><span>' +  $(this).children().text() + '</span></div>' +
                        '<input type="text" name="name-icon" value="' + $(this).data('name') + '">' +
                        '<p class="remove">&#x00D7</p></br>' +
                        '<input type="text" name="code-icon" maxlength="5" value="' +
                        $(this).data('code') + '" class="code">' +
                        '<input type="text" name="view-code" maxlength="2" value="' +
                        String.fromCodePoint(parseInt($(this).data('code'), 16)) + '" class="code2">' +
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
        var config = {
            "destFontPath": $('input[name="path"]').val(),
            "className": $('input[name="name-class"]').val(),
            "fontFamily": fontName
        };
        var content = getContent();

        if( content === 'invalid data' ) return;

        $.ajax({
            url: '/generate-font',
            type: 'post',
            dataType: 'json',
            data: {
                config: config,
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

        if( $('.invalid-data').length > 0 ) {
            alert('Please, check that all Unicode values entered in hex');
            return 'invalid data';
        }

        $('.cell').each(function(index, elem) {
            var key = $(elem).children('input[name="name-file"]').val();
            var name = $(elem).children('input[name="name-icon"]').val();
            var unicode = $(elem).children('input[name="code-icon"]').val();
            content[key] = {"unicode": unicode, "name": name};
        });

        return content;
    }
});




window.jQuery =  $;