import React from "react";
import {useImage} from "./ImageContext";
import {Box} from "@mui/material";
import {MuiFileInput} from "mui-file-input";

const ImageUploader: React.FC = () => {
    const {setImage} = useImage();
    const [value, setValue] = React.useState<File | null>(null)

    const handleChange = (file: File | null) => {
        if (!file) return;
        setValue(file);
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target?.result as string);
        reader.readAsDataURL(file);
    }

    return (
        <Box sx={{width: '100wv'}}>
            <MuiFileInput inputProps={{accept: '.png, .jpeg'}} onChange={handleChange}/>
        </Box>
    );
};

export {ImageUploader};