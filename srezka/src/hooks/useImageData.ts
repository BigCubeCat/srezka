import { createSignal } from "solid-js";


export const useImageData = () => {
  const [imageSrc, setImageSrc] = createSignal<string | null>(null);
  const [fullImageDataUrl, setFullImageDataUrl] = createSignal<string | null>(null);
  const [cellDataUrls, setCellDataUrls] = createSignal<string[]>([]);

  const generateGrid = (rows: number, cols: number) => {
    if (!imageSrc()) return;

    const image = new Image();
    image.onload = () => {
      // Создаём canvas для итогового изображения
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Рисуем исходное изображение
      ctx.drawImage(image, 0, 0);

      const cellWidth = image.width / cols;
      const cellHeight = image.height / rows;

      // Рисуем вертикальные линии
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      for (let j = 0; j <= cols; j++) {
        const x = j * cellWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, image.height);
        ctx.stroke();
      }

      // Рисуем горизонтальные линии
      for (let i = 0; i <= rows; i++) {
        const y = i * cellHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(image.width, y);
        ctx.stroke();
      }

      // Рисуем метки в центрах ячеек
      ctx.font = "20px Arial";
      ctx.fillStyle = "blue";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // Метка: буква строки (A, B, …) и номер столбца (1, 2, …)
          const label = `${String.fromCharCode(65 + i)}${j + 1}`;
          const centerX = j * cellWidth + cellWidth / 2;
          const centerY = i * cellHeight + cellHeight / 2;
          ctx.fillText(label, centerX, centerY);
        }
      }

      // Сохраняем итоговое изображение
      setFullImageDataUrl(canvas.toDataURL("image/png"));

      // Генерируем отдельное изображение для каждой ячейки
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
            cellHeight
          );
          cells.push(cellCanvas.toDataURL("image/png"));
        }
      }
      setCellDataUrls(cells);
    };

    image.src = imageSrc()!;
  };

  return { imageSrc, setImageSrc, fullImageDataUrl, cellDataUrls, generateGrid };
};