// Config.tsx
import { Component } from "solid-js";

import { useGridConf } from "../../hooks/useGridConf";

import ColorPicker from "./ColorPicker";

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
      <div style={{ marginBottom: "10px" }}>
        <label>
          Количество строк (A):{" "}
          <input
            type="number"
            min="1"
            value={props.rows}
            onInput={(e) => props.setRows(parseInt(e.currentTarget.value))}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Количество столбцов (B):{" "}
          <input
            type="number"
            min="1"
            value={props.cols}
            onInput={(e) => props.setCols(parseInt(e.currentTarget.value))}
          />
        </label>
      </div>
      <ColorPicker
        label="Цвет линий"
        onChange={props.setColor}
        value={props.color}
      />
    </>
  );
};

export default Config;
