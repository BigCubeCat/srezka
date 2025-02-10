import { createSignal } from "solid-js";

export const useGridConf = (
  initialRows: number = 3,
  initialCols: number = 3,
) => {
  const [rows, setRows] = createSignal(initialRows);
  const [cols, setCols] = createSignal(initialCols);
  const [color, setColor] = createSignal("#000000");
  return { rows, setRows, cols, setCols, color, setColor };
};
