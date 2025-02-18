// useImageData.ts
import { createSignal } from "solid-js";
import { cutCells } from "./imageUtils";

const X_GAP = 15;
const Y_GAP = 12;

export const useImageData = () => {
  const [imageSrc, setImageSrc] = createSignal<string | null>(null);
  const [fullImageDataUrl, setFullImageDataUrl] = createSignal<string | null>(
    null,
  );
  const [cellDataUrls, setCellDataUrls] = createSignal<string[]>([]);

  const generateGrid = (rows: number, cols: number, color: string) => {
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
      setCellDataUrls(cutCells(rows, cols, cellWidth, cellHeight, canvas));

      // Рисуем вертикальные линии сетки.
      ctx.strokeStyle = color;
      ctx.lineWidth = 6; // Увеличиваем толщину линий
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
      ctx.font = "bold 30px Arial"; // Увеличиваем размер и делаем шрифт жирным
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const label = `${String.fromCharCode(65 + i)}${j + 1}`;
          const centerX = j * cellWidth + X_GAP;
          const centerY = i * cellHeight + Y_GAP;
          ctx.fillText(label, centerX, centerY);
        }
      }

      // Сохраняем итоговое изображение в формате PNG.
      setFullImageDataUrl(canvas.toDataURL("image/png"));
      // Разделяем на строки и колонки
    };
    image.src = imageSrc()!;
  };

  return {
    imageSrc,
    setImageSrc,
    fullImageDataUrl,
    cellDataUrls,
    generateGrid,
  };
};
