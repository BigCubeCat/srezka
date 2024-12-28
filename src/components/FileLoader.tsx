import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "JPEG"];

export default function FileLoader() {
    const [file, setFile] = useState<string>("");
    console.log(file);
    const handleChange = (file: string) => {
        setFile(file);
    };
    return (
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    )
}