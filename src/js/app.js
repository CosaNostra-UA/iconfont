'use strict';


var $ = require('jquery');
/*var inputData = require('../inputData.json');*/

$('document').ready(function() {
    $('body').on('click', '.icon', function(){
        $(this).toggleClass('selected');
    });

    $('#font').click(function() {
        $.ajax({
            url: "test.html",
            success: function(html){
                $('#font').addClass('selected');
                $('.icons-list').hide();
                $('body').append(html);
            }
        });
    });
});



