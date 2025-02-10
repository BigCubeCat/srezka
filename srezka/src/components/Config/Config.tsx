// Config.tsx
import { Component } from "solid-js";

import { useGridConf } from "../../hooks/useGridConf";

import ColorPicker from "./ColorPicker";
import Row from "./Row";

interface IConfigProps {
  color: string;
  rows: number;
  cols: number;
  setRows: (arg0: number) => void;
  setCols: (arg0: number) => void;
  setColor: (arg0: string) => void;
}

const Config: Component<IConfigProps> = (props: IConfigProps) => {
  return (
    <>
    <div class="Geometry">
      <Row label="Строк" value={props.rows} callback={props.setRows} />
      <Row label="Столбцов" value={props.cols} callback={props.setCols} />
    </div>
     <ColorPicker
        label="Цвет"
        onChange={props.setColor}
        value={props.color}
      />
    </>
  );
};

export default Config;
