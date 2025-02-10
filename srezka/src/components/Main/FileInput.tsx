import { Component, createSignal } from "solid-js";

interface FileInputProps {
  label?: string;
  handleFileChange: (e: Event) => void;
}

const FileInput: Component<FileInputProps> = (props) => {
  let fileInputRef: HTMLInputElement | undefined;

  const openFileDialog = () => {
    fileInputRef?.click();
  };

  return (
    <div class="file-input-container">
      {/* Скрытый нативный input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={props.handleFileChange}
        style={{ display: "none" }}
      />
      {/* Кастомная кнопка */}
      <button type="button" onClick={openFileDialog} class="file-input-button">
        {props.label || "Выберите файл"}
      </button>
    </div>
  );
};

export default FileInput;
