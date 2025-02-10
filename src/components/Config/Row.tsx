// Row.tsx

import { Component } from "solid-js";
import "./Row.css";

interface IRowProps {
  label: string;
  value: number;
  callback: (arg0: number) => void;
}

const Row: Component<IRowProps> = (props: IRowProps) => {
  return (
    <div class="Column">
      <div class="Label">{props.label}</div>
      <input
        class="SpinBox"
        type="number"
        min="1"
        value={props.value}
        onInput={(e) => props.callback(parseInt(e.currentTarget.value))}
      />
    </div>
  );
};

export default Row;
