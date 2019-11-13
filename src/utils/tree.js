export function treeDatafilter(treedata, key) {
  if (!treedata) return [];
  if (!Array.isArray(treedata)) return [];

  let flag = false;
  function filter(data) {
    let ndata = [];
    ndata = data.filter(item => {
      const r = item.key !== key;
      if (!r) {
        flag = true;
      }
      return r;
    });
    return ndata;
  }

  let ndata = filter(treedata);
  if (!ndata) return [];
  if (flag) return ndata;
  ndata = ndata.map(item => {
    const nitem = { ...item };
    if ({}.hasOwnProperty.call(nitem, 'children')) {
      if (Array.isArray(item.children) && !flag) {
        nitem.children = filter(nitem.children);
      }
    }
    return nitem;
  });

  return ndata;
}
