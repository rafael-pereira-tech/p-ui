var R = window.React;
function jsx(type, props, key) {
  var p = {}, k;
  for (k in props) if (k !== "children") p[k] = props[k];
  if (key !== undefined) p.key = key;
  var c = props ? props.children : undefined;
  if (c === undefined) return R.createElement(type, p);
  return R.createElement(type, p, c);
}
function jsxs(type, props, key) {
  var p = {}, k;
  for (k in props) if (k !== "children") p[k] = props[k];
  if (key !== undefined) p.key = key;
  return R.createElement.apply(null, [type, p].concat(props.children));
}
module.exports = { jsx: jsx, jsxs: jsxs, jsxDEV: jsx, Fragment: R.Fragment };
