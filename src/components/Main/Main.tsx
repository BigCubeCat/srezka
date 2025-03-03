// Main.tsx

import { Component } from "solid-js";

import Config from "../Config/Config";
import FileLoader from "./FileLoader";
import { useImageData } from "~/hooks/useImageData";
import { useGridConf } from "~/hooks/useGridConf";

import "./Main.css";
import exportToPdf from "~/utils/pdf";

const Main: Component = () => {
  const { rows, cols, color, setRows, setCols, setColor } = useGridConf();

  const callback = (image: string, file: string) => {
    exportToPdf(image || "", file || "", rows(), cols(), color());
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
      <FileLoader imageCallback={callback} dataUrl={""} />
    </div>
  );
};

export default Main;
