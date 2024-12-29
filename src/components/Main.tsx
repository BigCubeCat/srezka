import React from "react";
import {ImageProcessor} from "./image/ImageProcessor";
import {ImageUploader} from "./image/ImageUploader";


export default function Main() {
    return (
        <>
            <ImageUploader/>
            <ImageProcessor/>
        </>
    );
};
