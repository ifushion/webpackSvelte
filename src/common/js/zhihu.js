(function () {
  window.zhad = [];
  var tag = document.createElement('script'); tag.type = 'text/javascript'; tag.async = true;
  tag.src = '//unpkg.zhimg.com/@efe/zhad-tracker@1.4.1';
  tag.onerror = function () {
    var img = new Image();
    img.src = '//sugar.zhihu.com/log_fe?js_url=' + window.encodeURIComponent(tag.src) + '&t=' + (+ new Date());
  }
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(tag, s);
})(window);