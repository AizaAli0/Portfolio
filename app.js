$(document).ready(function(){
    $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.nav-part2').toggleClass('nav-toggle');
    });
    $(window).on('scroll load',function(){
        $('.fa-bars').removeClass('fa-times');
        $('.nav-part2').removeClass('nav-toggle');
    })

});

document.getElementById('viewPdfBtn').addEventListener('click', function() {
    window.open('cv.pdf', '_blank'); 
})