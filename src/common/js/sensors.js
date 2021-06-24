import axios from 'axios'

function sensorInit (para) { var p = para.sdk_url, n = para.name, w = window, d = document, s = "script", x = null, y = null; if (typeof (w["sensorsDataAnalytic201505"]) !== "undefined") { return false } w["sensorsDataAnalytic201505"] = n; w[n] = w[n] || function (a) { return function () { (w[n]._q = w[n]._q || []).push([a, arguments]) } }; var ifs = ["track", "quick", "register", "registerPage", "registerOnce", "clearAllRegister", "trackSignup", "trackAbtest", "setProfile", "setOnceProfile", "appendProfile", "incrementProfile", "deleteProfile", "unsetProfile", "identify", "login", "logout", "trackLink"]; for (var i = 0; i < ifs.length; i++) { w[n][ifs[i]] = w[n].call(null, ifs[i]) } if (!w[n]._t) { x = d.createElement(s), y = d.getElementsByTagName(s)[0]; x.async = 1; x.src = p; x.setAttribute("charset", "UTF-8"); w[n].para = para; y.parentNode.insertBefore(x, y) } }

// 页面停留时间
const getTimeLatest = (() => {
	const startTime = Date.now() / 1000;
  return () => Date.now() / 1000 - startTime;
})()

const defaultInitParams = {
  name: 'sensors',
	server_url: '//genebox.cn/sa?project=production',
	sdk_url: '//static.genebox.cn/static/common/js/sensorsdata.min.js',
	heatmap: { clickmap: 'default', scroll_notice_map: 'default' }
}

// 初始化
function init(
  params = {},
) {
  const conf = Object.assign({}, defaultInitParams, params);
  sensorInit(conf); // 初始化
  const { sensors } = window;
  sensors.registerPage(trackParams);
  sensors.quick('autoTrack'); // 开启神策自动埋点
}

// 设置埋点默认参数
let trackParams = {
  appName: '投放h5',
  browseUrl: location.href,
};
function getParams() {
  return trackParams;
}
function setParams(params) {
  trackParams = {
    ...trackParams,
    ...params
  }
	window.sensors.registerPage(trackParams);
}

function track(...rest) {
  window.sensors.track(...rest);
}

function quick(...rest) {
  window.sensors.quick(...rest)
}

function startLoopTime() {
  window.sensors.quick('isReady', function () {
    const sensorsDistinctId = window.sensors.quick('getAnonymousID');
    if (!sensorsDistinctId) return;
    // 结束时间埋点  getTimeLatest
    setInterval(function () {
      const eventDuration = getTimeLatest();
      setParams({ $event_duration: eventDuration })
      axios.post('//genebox.cn/lasoexchange/adevent/weixin/residence/time', {
        sensorsDistinctId,
        eventDuration, // 秒
        slidingLocation: 1,
        ...trackParams,
      })
    }, 1000);
  });
}

export default {
  init,
  quick,
  track,
  setParams,
  getParams,
  getTimeLatest,
  startLoopTime,
};