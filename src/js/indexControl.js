(function ($, root) {
    function Control(len) {
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function () {
            this.index --;
            return this.getIndex();
        },
        next: function () {
            this.index ++;
            return this.getIndex();
        },
        getIndex: function () {
            return Math.abs(this.index % this.len);
        }
        // prev: function () {
        //     return this.getIndex(-1);
        // },
        // next: function () {
        //     return this.getIndex(1);
        // },
        // getIndex: function (val) {
        //     var index = this.index;
        //     var len = this.len;
        //     var curIndex = (index + val + len) % len;
        //     //改变后的索引
        //     return curIndex;
        // }
    }
    root.indexControl = Control;
}(window.Zepto, window.player || (window.player = {})));