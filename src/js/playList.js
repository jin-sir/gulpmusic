(function ($, root) {
    function renderDom(data) {
        var str = '';
        data.forEach(function (ele) {
            str += '<li><h3>'+ ele.song +'-<span>'+ ele.singer +'</span></h3></li>'
        });
        $('.list-wrap').html(str);
        singPlay(control.index);
        bindEvent();
    }
    function bindEvent() {

        $('.close-btn').on('click', function () {
            $('.playList').removeClass('show');
        });
        $('.list-wrap li').on('click', function () {
            var index = $(this).index();
            singPlay(index);
            $('.playList').removeClass('show');
            $('.play').addClass('playing');
            control.index = index;
            audio.play();
            $('body').trigger('play:change', index);
        });
    }
    function show() {
        $('.playList').addClass('show');
    }
    function singPlay(index) {
        $('.list-wrap').find('.sign').removeClass('sign');
        $('.list-wrap li').eq(index).addClass('sign');
    }
    root.playList = {
        renderDom: renderDom,
        show: show
    };
}(window.Zepto, window.player || (window.player={})))