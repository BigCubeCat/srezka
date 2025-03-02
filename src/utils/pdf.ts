import { jsPDF } from "jspdf";

const MARGIN = 15; // Отступы от краёв листа в мм
const MAX_WIDTH = 210 - 2 * MARGIN; // Максимальная ширина для изображения (половина листа А4)
const MAX_HEIGHT = (297 / 2) - 2 * MARGIN; // Максимальная высота для изображения (верхняя половина листа А4, равная А5)
const GAP = 5; // Промежуток между кусочками в мм

// Для перевода px -> мм (при экспорте первой страницы) выбираем DPI (например, 96)
const DPI = 96;
const CONVERT_TO_MM_SCALE = 25.4;

const size_in_mm = (value: number) => {
  return (value * CONVERT_TO_MM_SCALE) / DPI;
}

const exportToPdf = (src: string, cells: string[], rows: number, cols: number) => {
  if (!src) {
    alert("Пожалуйста, подождите! Изображение еще не было сгенерировано.");
    return;
  }

  // Создаём PDF-документ. Единицы измерения – миллиметры.
  const doc = new jsPDF("p", "mm", "a4");
  // Создаём объект Image для полной картинки
  const fullImg = new Image();
  fullImg.src = src!;
  fullImg.onload = () => {
    // Вычисляем натуральные размеры картинки в мм
    const fullImgWidthMm =  size_in_mm(fullImg.width);
    const fullImgHeightMm = size_in_mm(fullImg.height);
    // Определяем, нужно ли повернуть изображение
    const shouldRotate =  (fullImgWidthMm < fullImgHeightMm);

    // Масштабируем изображение, чтобы оно занимало верхнюю половину листа А4
    const scale = Math.min(
      MAX_WIDTH / (shouldRotate ? fullImgHeightMm : fullImgWidthMm),
      MAX_HEIGHT / (shouldRotate ? fullImgWidthMm : fullImgHeightMm)
    );
    const scaledWidth = (shouldRotate ? fullImgHeightMm : fullImgWidthMm) * scale;
    const scaledHeight = (shouldRotate ? fullImgWidthMm : fullImgHeightMm) * scale;

    // Создаём canvas для рисования сетки и нумерации
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx){
      alert("Неожиданная ошибка! Пожалуйста, напишите на e.bitochkin@g.nsu.ru")
      return;
    } 

    canvas.width = shouldRotate ? fullImg.height : fullImg.width;
    canvas.height = shouldRotate ? fullImg.width : fullImg.height;

    // Рисуем изображение на canvas
    if (shouldRotate) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(fullImg, -fullImg.width / 2, -fullImg.height / 2, fullImg.width, fullImg.height);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    } else {
      ctx.drawImage(fullImg, 0, 0, canvas.width, canvas.height);
    }

    // Рисуем вертикальные линии сетки
    ctx.strokeStyle = "black";
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

    const pieces: string[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Создаём canvas для вырезания кусочка
        const pieceCanvas = document.createElement("canvas");
        const pieceCtx = pieceCanvas.getContext("2d");
        if (!pieceCtx) return;

        pieceCanvas.width = pieceWidth;
        pieceCanvas.height = pieceHeight;

        // Вырезаем кусочек из основного изображения
        pieceCtx.drawImage(
          canvas,
          j * pieceWidth, i * pieceHeight, pieceWidth, pieceHeight, // Координаты и размеры кусочка
          0, 0, pieceWidth, pieceHeight // Координаты и размеры на новом canvas
        );

        // Конвертируем canvas в Data URL
        const pieceImageUrl = pieceCanvas.toDataURL("image/png");

        // Добавляем кусочек в массив
        pieces.push(pieceImageUrl);
      }
    }

    // Перемешиваем кусочки
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    // Добавляем перемешанные кусочки на вторую половину листа
    let pieceIndex = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const pieceImageUrl = pieces[pieceIndex++];

        // Создаём новый Image объект для кусочка
        const pieceImage = new Image();
        pieceImage.src = pieceImageUrl;

        // Ожидаем загрузки изображения
        pieceImage.onload = () => {
          // Создаём canvas для поворота кусочка
          const rotatedCanvas = document.createElement("canvas");
          const rotatedCtx = rotatedCanvas.getContext("2d");
          if (!rotatedCtx) return;

          rotatedCanvas.width = pieceWidth;
          rotatedCanvas.height = pieceHeight;

          // Поворачиваем кусочек на 180 градусов с вероятностью 50%
          if (Math.random() < 0.5) {
            rotatedCtx.translate(pieceWidth / 2, pieceHeight / 2);
            rotatedCtx.rotate(Math.PI);
            rotatedCtx.drawImage(pieceImage, -pieceWidth / 2, -pieceHeight / 2, pieceWidth, pieceHeight);
          } else {
            rotatedCtx.drawImage(pieceImage, 0, 0, pieceWidth, pieceHeight);
          }

          // Конвертируем canvas в Data URL
          const rotatedImageUrl = rotatedCanvas.toDataURL("image/png");

          // Добавляем кусочек на вторую половину листа с учетом промежутка
          const x = MARGIN + (j * (scaledWidth / cols + GAP)); // Учитываем промежуток по горизонтали
          const y = MARGIN + scaledHeight + MARGIN + (i * (scaledHeight / rows + GAP)); // Учитываем промежуток по вертикали
          doc.addImage(
            rotatedImageUrl,
            "PNG",
            x,
            y,
            scaledWidth / cols,
            scaledHeight / rows
          );

          // Если это последний кусочек, сохраняем PDF
          if (i === rows - 1 && j === cols - 1) {
            doc.save("output.pdf");
          }
        };
      }
    }
  };
};

export default exportToPdf;