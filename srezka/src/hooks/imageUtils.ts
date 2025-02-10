const cutCells = (
  rows: number,
  cols: number,
  cellWidth: number,
  cellHeight: number,
  canvas: CanvasImageSource,
) => {
  // Генерируем отдельное изображение для каждой ячейки.
  const cells: string[] = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cellCanvas = document.createElement("canvas");
      cellCanvas.width = cellWidth;
      cellCanvas.height = cellHeight;
      const cellCtx = cellCanvas.getContext("2d");
      if (!cellCtx) continue;
      cellCtx.drawImage(
        canvas,
        j * cellWidth,
        i * cellHeight,
        cellWidth,
        cellHeight,
        0,
        0,
        cellWidth,
        cellHeight,
      );
      cells.push(cellCanvas.toDataURL("image/png"));
    }
  }
  return cells;
};

export { cutCells };
