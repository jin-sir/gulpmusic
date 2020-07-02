// 1，对音乐进度条的渲染
// 2，播放暂停时进度条同步进行

(function ($, root) {
    var timeAll, timeInter;
    var newTime = 0, lastTime = 0;
    // 渲染进度条模块
    function renderAlltime(time) {
        timeAll = time;
        newTime = 0;
        lastTime = 0;
        $('.pro-top').css('transform', 'translatex(-100%)');
        // 将总时间渲染到页面上
        time = manageTime(time);
        cancelAnimationFrame(timeInter);
        timeInter = null;
        $('.time-start').html('00:00');
        $('.time-end').html(time);
    }
    // 处理时间
    function manageTime(time) {
        time = Math.round(time);
        var timeMinute = parseInt(time / 60);
        var timeSecond = time % 60;
        timeMinute = timeMinute >= 10 ? timeMinute : '0' + timeMinute;
        timeSecond = timeSecond >= 10 ? timeSecond : '0' + timeSecond;
        return timeMinute + ':' + timeSecond;
    }
    // 音乐播放时
    function timePlay() {
        start();
    }
    // 更新歌曲当前的播放时间
    function updataTime(time) {
        if (time && (time > 0 & time < timeAll)) {
            lastTime = time;
        }
        function frame() {
            var tempTime = new Date().getTime();
            tempTime = lastTime + (tempTime - newTime) / 1000;
            if (tempTime > timeAll) {
                cancelAnimationFrame(timeInter);
                timeInter = null;
                return;
            }
            $('.pro-top').css('transform', 'translatex(-'+ (100 - (tempTime / timeAll) * 100) +'%)');
            tempTime = manageTime(tempTime);
            $('.time-start').html(tempTime);
            timeInter = requestAnimationFrame(frame);
        }
        frame();
    }
    // 音乐暂停
    function timePause() {
        cancelAnimationFrame(timeInter);
        timeInter = null;
        var tempTime = new Date().getTime();
        lastTime = lastTime + (tempTime - newTime) / 1000;
    }
    function start(time) {
        newTime = new Date().getTime();
        updataTime(time);

    }
    root.pro = {
        renderAlltime: renderAlltime,
        timePlay: timePlay,
        timePause: timePause,
        start: start
    }

}(window.Zepto, window.player || (window.player = {})));