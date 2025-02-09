export  default function drawTable(userImage: string, rows: number, columns: number) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    if (!context) {
        return img;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    const cellWidth = canvas.width / columns;
    const cellHeight = canvas.height / rows;
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    for (let i = 0; i <= columns; i++) {
        const x = i * cellWidth;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
        if (i < columns) {
            context.fillStyle = 'black';
            context.font = '16px Arial';
            context.fillText(String.fromCharCode(65 + i), x + 5, 20);
        }
    }
    for (let j = 1; j <= rows; j++) {
        const y = j * cellHeight;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
        if (j < rows) {
            context.fillStyle = 'black';
            context.font = '16px Arial';
            context.fillText((j + 1).toString(), 5, y + 20);
        }
    }
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'edited-map.png';
    link.click();
    img.src = userImage;
    return img;
};
