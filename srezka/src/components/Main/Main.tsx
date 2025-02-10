// Main.tsx

import { Component } from "solid-js";

import Config from "../Config/Config";
import Result from "../Result/Result";
import FileLoader from "./FileLoader";
import { useImageData } from "~/hooks/useImageData";
import { useGridConf } from "~/hooks/useGridConf";

import "./Main.css";
import exportToPdf from "~/utils/pdf";

const Main: Component = () => {
  const { rows, cols, color, setRows, setCols, setColor } = useGridConf();
  const { setImageSrc, generateGrid, fullImageDataUrl, cellDataUrls } =
    useImageData();

  const setImage = (image: string) => {
    setImageSrc(image);
    generateGrid(rows(), cols(), color());
  };

  const decorateIntFunc = (func: (arg: number) => (arg: number) => void) => {
    return (arg: number) => {
      func(arg);
      generateGrid(rows(), cols(), color());
    };
  };

  const setColorFunc = (col: string) => {
    setColor(col);
    generateGrid(rows(), cols(), color());
  };

  const exportFile = () => {
    exportToPdf(fullImageDataUrl() || "", cellDataUrls(), rows(), cols());
  };

  return (
    <div class="MainComponent">
      <Config
        rows={rows()}
        cols={cols()}
        color={color()}
        setRows={decorateIntFunc(setRows)}
        setCols={decorateIntFunc(setCols)}
        setColor={setColorFunc}
      />
      <FileLoader imageCallback={setImage} dataUrl={fullImageDataUrl() || ""} />
      <button type="button" onClick={exportFile} class="download-button">
        Скачать
      </button>
    </div>
  );
};

export default Main;
