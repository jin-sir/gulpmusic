!function(e,t){var a,r,i=0,o=0;function m(t){t=Math.round(t);var n=parseInt(t/60),e=t%60;return(n=10<=n?n:"0"+n)+":"+(e=10<=e?e:"0"+e)}function n(t){i=(new Date).getTime(),function(t){t&&0<t&t<a&&(o=t),function t(){var n=(new Date).getTime();if(a<(n=o+(n-i)/1e3))return cancelAnimationFrame(r),void(r=null);e(".pro-top").css("transform","translatex(-"+(100-n/a*100)+"%)"),n=m(n),e(".time-start").html(n),r=requestAnimationFrame(t)}()}(t)}t.pro={renderAlltime:function(t){a=t,o=i=0,e(".pro-top").css("transform","translatex(-100%)"),t=m(t),cancelAnimationFrame(r),r=null,e(".time-start").html("00:00"),e(".time-end").html(t)},timePlay:function(){n()},timePause:function(){cancelAnimationFrame(r),r=null;var t=(new Date).getTime();o+=(t-i)/1e3},start:n}}(window.Zepto,window.player||(window.player={}));