import { jsPDF } from "jspdf";

const MARGIN = 5; // Отступы от краёв листа в мм
const MAX_WIDTH = 210 - 2 * MARGIN; // Максимальная ширина для изображения (половина листа А4)
const MAX_HEIGHT = 297 - 2 * MARGIN; // Максимальная высота для изображения (половина листа А4)

const exportToPdf = (src: string, cells: string[], rows: number, cols: number) => {
  if (!src) {
    alert("Сначала сгенерируйте изображение!");
    return;
  }

  // Создаём PDF-документ. Единицы измерения – миллиметры.
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Для перевода px -> мм (при экспорте первой страницы) выбираем DPI (например, 96)
  const dpi = 96;

  // Создаём объект Image для полной картинки
  const fullImg = new Image();
  fullImg.src = src!;
  fullImg.onload = () => {
    // Вычисляем натуральные размеры картинки в мм
    const fullImgWidthMm = (fullImg.width * 25.4) / dpi;
    const fullImgHeightMm = (fullImg.height * 25.4) / dpi;

    // Масштабируем изображение, чтобы оно занимало половину листа А4
    const scale = Math.min(MAX_WIDTH / fullImgWidthMm, MAX_HEIGHT / fullImgHeightMm);
    const scaledWidth = fullImgWidthMm * scale;
    const scaledHeight = fullImgHeightMm * scale;

    // Создаём canvas для рисования сетки и нумерации
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = fullImg.width;
    canvas.height = fullImg.height;

    // Рисуем изображение на canvas
    ctx.drawImage(fullImg, 0, 0, canvas.width, canvas.height);

    // Рисуем вертикальные линии сетки
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    for (let j = 0; j <= cols; j++) {
      const x = (j * canvas.width) / cols;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Рисуем горизонтальные линии сетки
    for (let i = 0; i <= rows; i++) {
      const y = (i * canvas.height) / rows;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Рисуем метки по периметру
    ctx.font = "bold 30px Arial"; // Крупный и жирный шрифт
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Буквы по горизонтали (сверху)
    for (let j = 0; j < cols; j++) {
      const label = String.fromCharCode(65 + j); // A, B, C, ...
      const x = (j * canvas.width) / cols + canvas.width / (2 * cols);
      const y = 20; // Отступ сверху
      ctx.fillText(label, x, y);
    }

    // Цифры по вертикали (слева)
    for (let i = 0; i < rows; i++) {
      const label = `${i + 1}`; // 1, 2, 3, ...
      const x = 20; // Отступ слева
      const y = (i * canvas.height) / rows + canvas.height / (2 * rows);
      ctx.fillText(label, x, y);
    }

    // Конвертируем canvas в Data URL
    const numberedImageUrl = canvas.toDataURL("image/png");

    // Добавляем изображение с сеткой и нумерацией на первую страницу
    doc.addImage(
      numberedImageUrl,
      "PNG",
      MARGIN,
      MARGIN,
      scaledWidth,
      scaledHeight,
    );

    // Добавляем вторую страницу для кусочков
    doc.addPage();

    // Размеры кусочков
    const cellWidth = scaledWidth / cols; // Ширина кусочка в мм
    const cellHeight = scaledHeight / rows; // Высота кусочка в мм

    // Перемешиваем массив ячеек (алгоритмом Фишера–Йетса)
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    // Размещаем кусочки в таблице n x m
    const n = rows; // Количество строк для кусочков
    const m = cols; // Количество столбцов для кусочков

    let x = MARGIN;
    let y = MARGIN;
    cells.forEach((cellUrl, index) => {
      // Поворачиваем некоторые кусочки на 180 градусов
      const isRotated = Math.random() > 0.5;
      const piece = isRotated ? rotateImage(cellUrl, 180) : cellUrl;

      const pieceImage = new Image();
      pieceImage.src = piece;

      pieceImage.onload = () => {
        doc.addImage(pieceImage, "PNG", x, y, cellWidth, cellHeight);

        // Переход к следующей ячейке
        x += cellWidth;
        if ((index + 1) % m === 0) {
          x = MARGIN;
          y += cellHeight;
        }
      };
    });

    // Сохраняем PDF
    doc.save("output.pdf");
  };
};

// Функция для поворота изображения на 180 градусов
const rotateImage = (src: string, degrees: number): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return src;

  const img = new Image();
  img.src = src;

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);

  return canvas.toDataURL("image/png");
};

export default exportToPdf;