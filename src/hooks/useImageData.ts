// useImageData.ts
import { createSignal } from "solid-js";

export const useImageData = () => {
  const [imageSrc, setImageSrc] = createSignal<string | null>(null);
  const [cellDataUrls, setCellDataUrls] = createSignal<string[]>([]);

  return {
    imageSrc,
    setImageSrc,
    cellDataUrls,
  };
};
