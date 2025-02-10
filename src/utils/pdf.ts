import { jsPDF } from "jspdf";

const MARGIN = 5;
const MAX_WIDTH = 210 - 2 * MARGIN;
const MAX_HEIGHT = 297 - 2 * MARGIN;

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
    // Добавляем картинку на первую страницу в натуральном размере
    // (расположив её с отступом margin от верхнего левого угла)
    doc.addImage(
      fullImg,
      "PNG",
      MARGIN,
      MARGIN,
      Math.min(fullImgWidthMm, MAX_WIDTH),
      Math.min(fullImgHeightMm, MAX_HEIGHT),
    );

    // Добавляем вторую страницу для ячеек
    doc.addPage();

    // Фиксированный размер ячейки – 3×3 см (30×30 мм)
    const cellWidth = fullImgWidthMm / cols; // мм
    const cellHeight = fullImgWidthMm / rows; // мм
    const cellMargin = 5; // отступ между ячейками в мм

    // Вычисляем, сколько ячеек по горизонтали можем разместить на странице
    // (с учётом отступов по краям)
    const availableWidth = pageWidth - 2 * MARGIN;
    const colsPerRow = Math.floor(
      (availableWidth + cellMargin) / (cellWidth + cellMargin),
    );
    const effectiveCols = colsPerRow > 0 ? colsPerRow : 1;

    // Перемешиваем массив ячеек (алгоритмом Фишера–Йетса)
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    // Размещаем ячейки на странице (добавляем новые страницы, если ячеек много)
    let x = MARGIN;
    let y = MARGIN;
    let colCounter = 0;
    cells.forEach((cellUrl) => {
      // Если добавление ячейки выйдет за нижний отступ страницы, создаём новую страницу
      if (y + cellHeight > pageHeight - MARGIN) {
        doc.addPage();
        x = MARGIN;
        y = MARGIN;
        colCounter = 0;
      }
      doc.addImage(cellUrl, "PNG", x, y, cellWidth, cellHeight);
      colCounter++;
      if (colCounter >= effectiveCols) {
        colCounter = 0;
        x = MARGIN;
        y += cellHeight + cellMargin;
      } else {
        x += cellHeight + cellMargin;
      }
    });

    // Сохраняем PDF
    doc.save("output.pdf");
  };
};
export default exportToPdf;
