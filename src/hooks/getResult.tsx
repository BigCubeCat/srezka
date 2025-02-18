// useImageData.ts
import { createSignal } from "solid-js";
import { cutCells, rotateImage } from "./imageUtils";

const X_GAP = 15; // Отступ для текста
const Y_GAP = 12; // Отступ для текста
const A4_WIDTH = 1240; // Ширина половины листа А4 в пикселях (при DPI 300)
const A4_HEIGHT = 1754; // Высота листа А4 в пикселях (при DPI 300)

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
      // Создаём canvas для исходного изображения
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Масштабируем изображение под половину листа А4
      const scale = Math.min(A4_WIDTH / image.width, A4_HEIGHT / image.height);
      canvas.width = image.width * scale;
      canvas.height = image.height * scale;

      // Рисуем изображение с масштабированием
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Вычисляем размеры ячеек
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      // Рисуем вертикальные линии сетки
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      for (let j = 0; j <= cols; j++) {
        const x = j * cellWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Рисуем горизонтальные линии сетки
      for (let i = 0; i <= rows; i++) {
        const y = i * cellHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Рисуем метки по периметру
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Буквы по горизонтали (сверху)
      for (let j = 0; j < cols; j++) {
        const label = String.fromCharCode(65 + j);
        const centerX = j * cellWidth + cellWidth / 2;
        const centerY = Y_GAP;
        ctx.fillText(label, centerX, centerY);
      }

      // Цифры по вертикали (слева)
      for (let i = 0; i < rows; i++) {
        const label = `${i + 1}`;
        const centerX = X_GAP;
        const centerY = i * cellHeight + cellHeight / 2;
        ctx.fillText(label, centerX, centerY);
      }

      // Сохраняем итоговое изображение с сеткой
      setFullImageDataUrl(canvas.toDataURL("image/png"));

      // Разрезаем изображение на ячейки
      const cells = cutCells(rows, cols, cellWidth, cellHeight, canvas);

      // Создаём canvas для второй половины листа (кусочки)
      const puzzleCanvas = document.createElement("canvas");
      const puzzleCtx = puzzleCanvas.getContext("2d");
      if (!puzzleCtx) return;

      puzzleCanvas.width = A4_WIDTH;
      puzzleCanvas.height = A4_HEIGHT;

      // Размещаем кусочки в таблице n x m
      const n = 3; // Количество строк для кусочков
      const m = 3; // Количество столбцов для кусочков
      const pieceWidth = A4_WIDTH / m;
      const pieceHeight = A4_HEIGHT / n;

      cells.forEach((cell, index) => {
        const row = Math.floor(index / m);
        const col = index % m;

        // Поворачиваем некоторые кусочки на 180 градусов
        const isRotated = Math.random() > 0.5;
        const piece = isRotated ? rotateImage(cell, 180) : cell;

        const pieceImage = new Image();
        pieceImage.src = piece;

        pieceImage.onload = () => {
          puzzleCtx.drawImage(
            pieceImage,
            col * pieceWidth,
            row * pieceHeight,
            pieceWidth,
            pieceHeight,
          );

          // Если это последний кусочек, сохраняем результат
          if (index === cells.length - 1) {
            setCellDataUrls([puzzleCanvas.toDataURL("image/png")]);
          }
        };
      });
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