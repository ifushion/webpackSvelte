// 参数解构(?a=1&b=2)
function queryParams(search) {
  const url = search || location.search;
  const paramArr = url.slice(1).split('&');
  const params = {};
  paramArr.forEach(item => {
    const [n, v] = item.split('=');
    params[n] = v;
  })
  return params;
}

export {
  queryParams,
}