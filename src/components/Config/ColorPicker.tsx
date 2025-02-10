// ColorPicker.tsx
import { Component } from "solid-js";
import "./Row.css";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void; // функция-обработчик изменения цвета
}

const ColorPicker: Component<ColorPickerProps> = (props) => {
  const handleChange = (e: Event) => {
    const newColor = (e.target as HTMLInputElement).value;
    props.onChange(newColor);
  };

  return (
    <div class="Row">
      <div class="Label">{props.label}</div>
      <input
        class="ColorPicker"
        type="color"
        value={props.value}
        onInput={handleChange}
      />
    </div>
  );
};

export default ColorPicker;
