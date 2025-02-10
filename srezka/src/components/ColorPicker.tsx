// ColorPicker.tsx
import { Component } from "solid-js";

interface ColorPickerProps {
  label: string;               // подпись, например "Цвет сетки" или "Цвет подписей"
  value: string;               // текущее выбранное значение цвета, например "#ff0000"
  onChange: (color: string) => void; // функция-обработчик изменения цвета
}

const ColorPicker: Component<ColorPickerProps> = (props) => {
  const handleChange = (e: Event) => {
    const newColor = (e.target as HTMLInputElement).value;
    props.onChange(newColor);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        {props.label}:{" "}
        <input type="color" value={props.value} onInput={handleChange} />
      </label>
    </div>
  );
};

export default ColorPicker;
