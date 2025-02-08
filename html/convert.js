const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Читаем содержимое HTML-файла
    const htmlContent = fs.readFileSync('index.html', 'utf8');

    // Устанавливаем содержимое страницы
    await page.setContent(htmlContent);

    // Создаем PDF
    await page.pdf({ path: 'output.pdf', format: 'A4' });

    await browser.close();
    console.log('PDF успешно создан: output.pdf');
})();
