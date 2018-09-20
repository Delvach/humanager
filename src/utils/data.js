export const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

export const rgb2hsv = hexvalue => {
  let { r, g, b } = hexToRgb(hexvalue);

  let rr,
    gg,
    bb,
    h,
    s,
    v = Math.max(r, g, b),
    diff = v - Math.min(r, g, b),
    diffc = c => (v - c) / 6 / diff + 1 / 2;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(r);
    gg = diffc(g);
    bb = diffc(b);

    if (r === v) {
      h = bb - gg;
    } else if (g === v) {
      h = 1 / 3 + rr - bb;
    } else if (b === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
};

export const defaultSort = sortBy => (a, b) => {
  if (a[sortBy] > b[sortBy]) return 1;
  if (b[sortBy] > a[sortBy]) return -1;
  return 0;
};

export const colorSort = sortBy => (a, b) => {
  const aValue = rgb2hsv(a[sortBy].substring(1)).h;
  const bValue = rgb2hsv(b[sortBy].substring(1)).h;
  if (aValue > bValue) return 1;
  if (bValue > aValue) return -1;
  return 0;
};

export const getSortedItems = (items = [], sortBy = 'name') => {
  if (!sortBy || sortBy === 'random') return items;

  const sorter = sortBy === 'color' ? colorSort(sortBy) : defaultSort(sortBy);

  items.sort(sorter);
  return items;
};
