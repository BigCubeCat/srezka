// Result.tsx

import { Component } from "solid-js";

interface IResultProps {
  cols: number;
  data: string[];
};

const Result: Component<IResultProps> = (props: IResultProps) => {
  return (
    <>
      {props.data.length > 0 && (
        <div>
          <h2>Ячейки</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
              gap: "10px",
            }}
          >
            {props.data.map((cellUrl, index) => {
              const rowIndex = Math.floor(index / props.cols);
              const colIndex = index % props.cols;
              const label = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              return (
                <div
                  style={{ border: "1px solid #ccc", padding: "5px" }}
                  key={label}
                >
                  <img
                    src={cellUrl}
                    alt={`Ячейка ${label}`}
                    style={{ width: "100%" }}
                  />
                  <div>
                    <a href={cellUrl} download={`cell_${label}.png`}>
                      Скачать ячейку {label}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
