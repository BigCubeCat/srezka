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
  const { cellDataUrls } =
    useImageData();

  const callback = (image: string) => {
    exportToPdf(image || "", cellDataUrls(), rows(), cols());
  }

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
