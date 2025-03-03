import { jsPDF } from "jspdf";
import TPiece from "./tpiece";

const MARGIN = 10; // Отступы от краёв листа в мм
const A4_WIDTH_IN_MM = 210;
const A4_HEIGHT_IN_MM = 297;
const MAX_WIDTH = A4_WIDTH_IN_MM - 2 * MARGIN; // Максимальная ширина для изображения (половина листа А4)
const MAX_HEIGHT = A4_HEIGHT_IN_MM / 2 - 2 * MARGIN; // Максимальная высота для изображения (верхняя половина листа А4, равная А5)
const GAP = 2; // Промежуток между кусочками в мм

// Для перевода px -> мм (при экспорте первой страницы) выбираем DPI (например, 96)
const DPI = 96;
const CONVERT_TO_MM_SCALE = 25.4;

const showError = (errno: number) => {
  return (
    "Неожиданная ошибка(" +
    errno.toString() +
    ")! Пожалуйста, напишите на e.bitochkin@g.nsu.ru"
  );
};

const size_in_mm = (value: number) => {
  return (value * CONVERT_TO_MM_SCALE) / DPI;
};

const exportToPdf = (
  src: string,
  filename: string,
  rows: number,
  cols: number,
  color: string,
) => {
  if (!src) {
    showError(1);
    return;
  }

  // Создаём PDF-документ. Единицы измерения – миллиметры.
  const doc = new jsPDF("p", "mm", "a4");
  // Создаём объект Image для полной картинки
  const fullImg = new Image();
  fullImg.src = src!;
  fullImg.onload = () => {
    // Вычисляем натуральные размеры картинки в мм
    const fullImgWidthMm = size_in_mm(fullImg.width);
    const fullImgHeightMm = size_in_mm(fullImg.height);
    // Определяем, нужно ли повернуть изображение
    const shouldRotate = fullImgWidthMm < fullImgHeightMm;

    // Масштабируем изображение, чтобы оно занимало верхнюю половину листа А4
    const scale = Math.min(
      MAX_WIDTH / (shouldRotate ? fullImgHeightMm : fullImgWidthMm),
      MAX_HEIGHT / (shouldRotate ? fullImgWidthMm : fullImgHeightMm),
    );
    const scaledWidth =
      (shouldRotate ? fullImgHeightMm : fullImgWidthMm) * scale;
    const scaledHeight =
      (shouldRotate ? fullImgWidthMm : fullImgHeightMm) * scale;

    // Создаём canvas для рисования сетки и нумерации
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      showError(2);
      return;
    }

    canvas.width = shouldRotate ? fullImg.height : fullImg.width;
    canvas.height = shouldRotate ? fullImg.width : fullImg.height;

    // Рисуем изображение на canvas
    if (shouldRotate) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(
        fullImg,
        -fullImg.width / 2,
        -fullImg.height / 2,
        fullImg.width,
        fullImg.height,
      );
      ctx.rotate((-90 * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    } else {
      ctx.drawImage(fullImg, 0, 0, canvas.width, canvas.height);
    }

    // Рисуем вертикальные линии сетки
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
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

    // Конвертируем canvas в Data URL
    const numberedImageUrl = canvas.toDataURL("image/png");

    // Добавляем изображение с сеткой на первую страницу
    doc.addImage(
      numberedImageUrl,
      "PNG",
      MARGIN,
      MARGIN,
      scaledWidth,
      scaledHeight,
    );

    // Рисуем метки по периметру на PDF
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");

    // Буквы по вертикали (слева)
    for (let i = 0; i < rows; i++) {
      const label = String.fromCharCode(65 + i); // A, B, C, ...
      const x = MARGIN / 2; // Отступ слева
      const y = MARGIN + (i * scaledHeight) / rows + scaledHeight / (2 * rows);
      doc.text(label, x, y, { align: "center" });
    }

    // Цифры по горизонтали (сверху)
    for (let j = 0; j < cols; j++) {
      const label = `${j + 1}`; // 1, 2, 3, ...
      const x = MARGIN + (j * scaledWidth) / cols + scaledWidth / (2 * cols);
      const y = MARGIN / 2; // Отступ сверху
      doc.text(label, x, y, { align: "center" });
    }

    // Вырезаем кусочки из изображения
    const pieceWidth = canvas.width / cols;
    const pieceHeight = canvas.height / rows;

    let pieces: string[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Создаём canvas для вырезания кусочка
        const pieceCanvas = document.createElement("canvas");
        const pieceCtx = pieceCanvas.getContext("2d");
        if (!pieceCtx) return;

        pieceCanvas.width = pieceWidth;
        pieceCanvas.height = pieceHeight;

        // Вырезаем кусочек из основного изображения, scaledWidth
        pieceCtx.drawImage(
          canvas,
          j * pieceWidth,
          i * pieceHeight,
          pieceWidth,
          pieceHeight, // Координаты и размеры кусочка
          0,
          0,
          pieceWidth,
          pieceHeight, // Координаты и размеры на новом canvas
        );
        pieces.push(pieceCanvas.toDataURL("image/png"));
      }
    }

    // Перемешиваем кусочки
    pieces = pieces.sort((a: string, b: string) => 0.5 - Math.random());
    // Добавляем перемешанные кусочки на вторую половину листа
    const pieceWidthMm = scaledWidth / cols;
    const pieceHeightMm = scaledHeight / rows;

    const countCols = Math.floor((A4_WIDTH_IN_MM - ((cols+4)*GAP) - MARGIN)/pieceWidthMm);
    const countRows = Math.floor((A4_HEIGHT_IN_MM / 2 - MARGIN) / (pieceHeightMm + GAP));


    // Размещаем кусочки на второй половине листа
    let currentRow = 0; // Начинаем с нулевой строки
    let currentCol = 0; // Начинаем с нулевого столбца
    let currentPage = 1; // Счётчик страниц
    doc.addPage(); // Добавляем новую страницу

    pieces.forEach((img, index) => {
      // Если кусочков больше, чем может поместиться в одной строке, переходим на следующую строку
      if (currentCol >= countCols) {
        currentCol = 0; // Сбрасываем счётчик столбцов
        currentRow++;   // Переходим на следующую строку
      }

      // Если строк больше, чем может поместиться на одной странице, добавляем новую страницу
      if (currentRow >= countRows*2) {
        doc.addPage(); // Добавляем новую страницу
        currentPage++; // Увеличиваем счётчик страниц
        currentRow = 0; // Сбрасываем счётчик строк
      }

      // Рассчитываем координаты для размещения кусочка
      const x = MARGIN + currentCol * (pieceWidthMm + GAP);

      // Если это первая страница, кусочки добавляются на вторую половину листа
      // Если это вторая страница и выше, кусочки добавляются на первую половину листа
      const y = currentPage === 0
        ? A4_HEIGHT_IN_MM / 2 + MARGIN + currentRow * (pieceHeightMm + GAP) // Вторая половина первой страницы
        : MARGIN + currentRow * (pieceHeightMm + GAP); // Первая половина последующих страниц

      // Добавляем кусочек на страницу
      doc.addImage(img, "png", x, y, pieceWidthMm, pieceHeightMm);

      // Увеличиваем счётчик столбцов
      currentCol++;
    });
    doc.save(filename + "_splited.pdf");
  };
};

export default exportToPdf;
