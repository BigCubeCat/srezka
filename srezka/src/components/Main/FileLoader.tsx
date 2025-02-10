// FileLoader.tsx
import { Component } from "solid-js";

interface IFileLoaderProps {
  dataUrl: string;
  callback: () => void;
  imageCallback: (src: string) => void;
}

const FileLoader: Component<IFileLoaderProps> = (props: IFileLoaderProps) => {
  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        props.imageCallback(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
      </div>

      {/* Кнопка генерации */}
      <div style={{ marginBottom: "20px" }}>
        <button class="button" onClick={props.callback}>
          сгенерировать
        </button>
      </div>

      {/* Вывод итогового изображения */}
      {props.dataUrl && (
        <div style={{ marginBottom: "20px" }}>
          <h2>Измененное изображение</h2>
          <img
            src={props.dataUrl!}
            alt="Измененное изображение"
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid #ccc",
            }}
          />
          <div>
            <a href={props.dataUrl!} download="modified.png">
              Скачать измененное изображение
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default FileLoader;
