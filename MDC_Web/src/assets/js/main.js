$('#xm-icoaside').click(function() {
    $('#xm-navleft').toggleClass('col-md-1 d-none d-md-block xm-navleft xm-navleftdeltil');
    $('#xm-navleft').toggleClass('col-md-2 d-none d-md-block xm-navleft');
    $('#xm-main').toggleClass('col-md-9 ml-sm-auto col-lg-9 px-4');
    $('#xm-main').toggleClass('col-md-11 ml-sm-auto col-lg-11 px-4');
    return false;
});

$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})