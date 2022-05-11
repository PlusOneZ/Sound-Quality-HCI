
function colorMod(hex, options) {
  if (hex.length === 4) {
    hex = hex.replace(/([^#])/g, '$1$1');
  }
  if (hex.length === 7) {
    var r = hex.substring(1, 3);
    var g = hex.substring(3, 5);
    var b = hex.substring(5, 7);
    var a = options.alpha;
    return 'rgba(' + parseInt(r, 16) + ',' + parseInt(g, 16) + ',' + parseInt(b, 16) + ',' + a + ')';
  }
  return '';
}

export {colorMod};