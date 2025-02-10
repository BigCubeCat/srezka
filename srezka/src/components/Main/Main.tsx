// Main.tsx

import { Component } from "solid-js";

import Config from "../Config/Config";
import Result from "../Result/Result";
import FileLoader from "./FileLoader";
import { useImageData } from "~/hooks/useImageData";
import { useGridConf } from "~/hooks/useGridConf";

const Main: Component = () => {
  const { rows, cols, color, setRows, setCols, setColor } = useGridConf();
  const { setImageSrc, generateGrid, fullImageDataUrl, cellDataUrls } = useImageData();

  const onGenerate = () => {
    generateGrid(rows(), cols(), color());
  };

  return (
    <div class="MainComponent">
      <Config
        rows={rows()}
        cols={cols()}
        color={color()}
        setRows={setRows}
        setCols={setCols}
        setColor={setColor}
      />
      <FileLoader
        callback={onGenerate}
        imageCallback={setImageSrc}
        dataUrl={fullImageDataUrl() || ""}
      />
      <Result
        data={cellDataUrls()}
        cols={cols()}
       />
    </div>
  );
};

export default Main;
