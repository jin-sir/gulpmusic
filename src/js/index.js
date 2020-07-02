var root = window.player;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;
var deg = 0;
var renderAlltime = root.pro.renderAlltime;
var timePlay = root.pro.timePlay;
var timePause = root.pro.timePause;
var start = root.pro.start;
var timeAll;
console.log(root);


// 获取数据
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            dataList = data;
            len = dataList.length;
            control = new root.indexControl(len);
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            root.playList.renderDom(data);
            timeAll = data[0].duration;
            renderAlltime(timeAll);
            bindEvent();
            bindTouch();
        },
        error: function () {
            console.log("error");
        }
    })
}

function bindEvent() {
    // 方法一
    $('body').on('play:change', function (e, index) {
        timeAll = dataList[index].duration;
        root.render(dataList[index]);
        audio.getAudio(dataList[index].audio);
        renderAlltime(dataList[index].duration)
        $('.img-box').css({
            'transform': 'rotatez(0deg)',
            'transition': 'none'
        });
        deg = 0
        if (audio.status == 'play') {
            audio.play();
            timePlay();
            rotated(0);
        };
    });
    $('.prev').on('click', function () {
        var i = control.prev();
        $('body').trigger('play:change', i);
        // audioChange(i);
    });
    $('.next').on('click', function () {
        var i = control.next();
        $('body').trigger('play:change', i);
        // audioChange(i);
    });
    $('.play').on('click', function () {
        $('.play').toggleClass('playing');
        if (audio.status == 'play') {
            audio.pause();
            timePause();
            clearInterval(timer);
            timer = null;
        } else {
            audio.play();
            timePlay();
            rotated();
        };
    });

    $('.list').on('click', function () {
        root.playList.show();
    });


}

function bindTouch() {
    var offset = $('.pro-bottom').offset()
    var left = offset.left;
    var width = offset.width;
    $('.slider').on('touchstart', function (e) {
        timePause();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = ((x - left) / width) * timeAll;
        start(per)
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = ((x - left) / width) * timeAll;
        $('.play').addClass('playing');
        audio.play();
        timePlay();
        rotated();
        audio.playTo(per)
    })
}

function rotated() {
    clearInterval(timer);
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').css({
            'transform': 'rotatez('+ deg+'deg)',
            'transition': 'transform 0.2s'
        })
    }, 200);
}


// 方法二
// function audioChange(i) {
//     root.render(dataList[i]);
//     audio.getAudio(dataList[i].audio);
//     if (audio.status == 'play') {
//         audio.play();
//     };
// }

getData("../mock/data.json");

// 信息+图片渲染到页面上
// 点击按钮
// 音频的播放与暂停   切歌
// 进度条的运动与拖拽
// 图片旋转
// 列表切歌