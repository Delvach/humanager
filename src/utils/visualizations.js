export const dataAsPx = d => `${d}px`;

export const getRandomPosition = () => ({
  x: Math.random(),
  y: Math.random(),
  type: 'random'
});

export const getSquareInCircle = (cx, cy, radius) => {
  const side = Math.sqrt(radius * radius * 2); // calc side length of square
  const half = side * 0.5; // position offset

  return {
    x: cx - half,
    y: cy - half,
    w: side,
    h: side
  };
};
