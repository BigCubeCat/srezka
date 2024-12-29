import React, {useState} from "react";
import {useImage} from "./ImageContext.tsx";

const ImageProcessor: React.FC = () => {
    const { image } = useImage();
    const [rows, setRows] = useState<number>(5);
    const [columns, setColumns] = useState<number>(5);

    const handleDownload = () => {
        if (!image) return;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new Image();

        if (context) {
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                // Draw grid
                const cellWidth = canvas.width / columns;
                const cellHeight = canvas.height / rows;

                context.strokeStyle = 'black';
                context.lineWidth = 1;

                // Draw vertical lines and label columns
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

                // Draw horizontal lines and label rows
                for (let j = 0; j <= rows; j++) {
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

                // Trigger download
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'edited-image.png';
                link.click();
            };

            img.src = image;
        }
    };

    return (
        <div>
            {image ? (
                <>
                    <img src={image} alt="Uploaded" style={{ maxWidth: '100%', marginBottom: '10px' }} />
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Rows: <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} min={1} />
                        </label>
                        <label style={{ marginLeft: '10px' }}>
                            Columns: <input type="number" value={columns} onChange={(e) => setColumns(Number(e.target.value))} min={1} />
                        </label>
                    </div>
                    <button onClick={handleDownload}>Download Edited Image</button>
                </>
            ) : (
                <p>No image uploaded yet.</p>
            )}
        </div>
    );
};

export {ImageProcessor};