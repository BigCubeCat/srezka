// App.tsx
import { Component } from "solid-js";
import { useGridConf } from "./hooks/useGridConf";
import { useImageData } from "./hooks/useImageData";

import ColorPicker from "./components/ColorPicker";

import { Button } from "@kobalte/core/button";
import './app.css'
import Header from "./components/Header/Header";

const App: Component = () => {
  const { rows, setRows, cols, setCols, color, setColor } = useGridConf(3, 3);
  const { imageSrc, setImageSrc, fullImageDataUrl, cellDataUrls, generateGrid } = useImageData();

  // Обработка выбора файла (поддерживаются PNG и JPG)
  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImageSrc(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onGenerateGrid = () => {
    generateGrid(rows(), cols(), color());
  };

  return (
    <div class="app">
      <Header />

      <ColorPicker label="Цвет сетки" value={color()} onChange={setColor}  />

      {/* Настройка количества строк и столбцов */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Количество строк (A):{" "}
          <input
            type="number"
            min="1"
            value={rows()}
            onInput={(e) => setRows(parseInt(e.currentTarget.value))}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Количество столбцов (B):{" "}
          <input
            type="number"
            min="1"
            value={cols()}
            onInput={(e) => setCols(parseInt(e.currentTarget.value))}
          />
        </label>
      </div>

      {/* Загрузка файла – поддерживаются PNG и JPG */}
      <div style={{ marginBottom: "10px" }}>
        <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
      </div>

      {/* Кнопка генерации */}
      <div style={{ marginBottom: "20px" }}>
        <Button class="button" onClick={onGenerateGrid}>сгенерировать</Button>
      </div>

      {/* Вывод итогового изображения */}
      {fullImageDataUrl() && (
        <div style={{ marginBottom: "20px" }}>
          <h2>Измененное изображение</h2>
          <img
            src={fullImageDataUrl()!}
            alt="Измененное изображение"
            style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }}
          />
          <div>
            <a href={fullImageDataUrl()!} download="modified.png">
              Скачать измененное изображение
            </a>
          </div>
        </div>
      )}

      {/* Вывод ячеек */}
      {cellDataUrls().length > 0 && (
        <div>
          <h2>Ячейки</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols()}, 1fr)`,
              gap: "10px",
            }}
          >
            {cellDataUrls().map((cellUrl, index) => {
              const rowIndex = Math.floor(index / cols());
              const colIndex = index % cols();
              const label = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              return (
                <div style={{ border: "1px solid #ccc", padding: "5px" }} key={label}>
                  <img src={cellUrl} alt={`Ячейка ${label}`} style={{ width: "100%" }} />
                  <div>
                    <a href={cellUrl} download={`cell_${label}.png`}>
                      Скачать ячейку {label}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
