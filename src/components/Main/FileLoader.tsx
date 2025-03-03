// FileLoader.tsx
import { Component } from "solid-js";

import "./Main.css";
import FileInput from "./FileInput";

interface IFileLoaderProps {
  dataUrl: string;
  imageCallback: (src: string, name: string) => void;
}

const FileLoader: Component<IFileLoaderProps> = (props: IFileLoaderProps) => {
  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        props.imageCallback(ev.target?.result as string, file.name as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <FileInput label="Разрезать" handleFileChange={handleFileChange} />
    </>
  );
};

export default FileLoader;
