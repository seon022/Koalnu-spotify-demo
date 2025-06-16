export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 45 + Math.random() * 35;
  const lightness = 20 + Math.random() * 15;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
