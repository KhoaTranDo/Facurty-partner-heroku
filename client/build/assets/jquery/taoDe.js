$(function () {
    $('h4').animate({opacity:0});

    $('.nut').click(function (e) {
        $(this).animate({opacity:0.5});
        $('img.hinh2').animate({marginLeft:200},2000);

        
    });
    //ẩn nội dung
    $('.nd').slideUp();
    //click vào h3
    $('.khoi h3').click(function (e) { 
    // console.log('đã click');   
    $('.nd').slideUp();
    $(this).next().slideToggle(); 

    });
});