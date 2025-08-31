export function isKoaContext(x) {
  return (
    !!x &&
    typeof x === 'object' &&
    x.request &&
    x.response &&
    x.app &&
    x.req &&
    x.res &&
    typeof x.throw === 'function' &&
    typeof x.assert === 'function' &&
    typeof x.set === 'function' &&
    typeof x.get === 'function' &&
    x.request?.ctx === x &&
    x.response?.ctx === x &&
    x.request?.response === x.response &&
    x.response?.request === x.request
  );
}
