export const createColorGenerator = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return (alpha = 1) => `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
