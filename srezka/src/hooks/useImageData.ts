// useImageData.ts
import { createSignal } from "solid-js";

export const useImageData = () => {
  const [imageSrc, setImageSrc] = createSignal<string | null>(null);
  const [fullImageDataUrl, setFullImageDataUrl] = createSignal<string | null>(null);
  const [cellDataUrls, setCellDataUrls] = createSignal<string[]>([]);

  const generateGrid = (rows: number, cols: number) => {
    if (!imageSrc()) return;

    const image = new Image();
    image.onload = () => {
      // Создаём canvas и получаем его контекст.
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Если изображение имеет ширину больше высоты, поворачиваем его на 90° по часовой стрелке.
      if (image.width > image.height) {
        // Новые размеры: ширина = исходная высота, высота = исходная ширина.
        canvas.width = image.height;
        canvas.height = image.width;
        // Сохраняем контекст, чтобы преобразования не повлияли на последующее рисование.
        ctx.save();
        // Выполняем сдвиг и поворот.
        ctx.translate(canvas.width, 0);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(image, 0, 0);
        // Восстанавливаем исходный контекст.
        ctx.restore();
      } else {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
      }

      // Вычисляем размеры ячеек.
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      // Рисуем вертикальные линии сетки.
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      for (let j = 0; j <= cols; j++) {
        const x = j * cellWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Рисуем горизонтальные линии сетки.
      for (let i = 0; i <= rows; i++) {
        const y = i * cellHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Рисуем метки в центрах ячеек (буква строки и номер столбца).
      ctx.font = "20px Arial";
      ctx.fillStyle = "blue";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const label = `${String.fromCharCode(65 + i)}${j + 1}`;
          const centerX = j * cellWidth + cellWidth / 2;
          const centerY = i * cellHeight + cellHeight / 2;
          ctx.fillText(label, centerX, centerY);
        }
      }

      // Сохраняем итоговое изображение в формате PNG.
      setFullImageDataUrl(canvas.toDataURL("image/png"));

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
            cellHeight
          );
          cells.push(cellCanvas.toDataURL("image/png"));
        }
      }
      setCellDataUrls(cells);
    };

    // Поддерживаются как PNG, так и JPG; итоговый формат – PNG.
    image.src = imageSrc()!;
  };

  return { imageSrc, setImageSrc, fullImageDataUrl, cellDataUrls, generateGrid };
};
