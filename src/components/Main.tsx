import React from "react";
import {ImageProvider} from "./image/ImageContext";
import {ImageProcessor} from "./image/ImageProcessor";
import {ImageUploader} from "./image/ImageUploader";


export default function Main() {
    return (
        <ImageProvider>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Image Editor</h1>
                <ImageUploader />
                <ImageProcessor />
            </div>
        </ImageProvider>
    );
};
