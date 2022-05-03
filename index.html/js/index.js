$(function () {
    // 判断是否是PC端
    if(!navigator.userAgent.match(/mobile/i)){
        const $info = $('.info')
        // $('body').prepend("<div class='_phone'></div>")
        // $info.appendTo($('._phone'))
        $info.addClass('isPC')
    }else{
        const $textItems = $('.textItems')
        $textItems.each(i => $textItems.eq(i).addClass('isPhone'))
    }
});
//======================游戏模块==========================

//首页
$(function(){
    $(".helpBtn").click(function(){
        $(".help").fadeIn(500);
        $(".help").click(function () {
            $(this).slideUp(300);
        })
    })
    $(".start").click(function(){
        $("#start").fadeOut(300);
        $(".line").fadeIn(500);
    })
    $("#slotMachineButton2").click(function(){
        $(".line").fadeOut(300);
        $(".lucky-star").fadeIn(500);
    })



})

















