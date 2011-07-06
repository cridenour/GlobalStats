jQuery(function () {
    // Toggle notifications pane
    $('#notifications div.handle').click(function () {
        var pane = $('#notifications div.pane');

        if (pane.is(':visible')) {
            pane.slideUp().parent().removeClass('open');
        } else {
            pane.slideDown().parent().addClass('open');
        }
    });

    
});