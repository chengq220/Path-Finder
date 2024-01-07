const GenerateEmptyGrid = (rows, cols) => {
  return Array.from({ length: rows }).map(() =>
    Array.from({ length: cols }).fill(0)
  );
};

export { GenerateEmptyGrid };
