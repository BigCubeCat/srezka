import React from "react";
import {useImage} from "./ImageContext";
import {Box, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {Redirect} from "wouter";

const ImageUploader: React.FC = () => {
    const [file, setFile] = React.useState<File|null>(null);
    const [fileExists, setFileExists] = React.useState<boolean>(false);

    const {setImage} = useImage();

    const handleChange = (f: File | null) => {
        if (f === null) return;
        setFile(f);
        if (f) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(f);
            setFileExists(true);
        }
    };

    console.log(
        fileExists
    );
    if (fileExists) {
        return <Redirect to={'/proc'} />;
    }

    return (
        <Box sx={{
            width: '100wv',
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography sx={{marginBottom: 10}} variant={'h4'} className={'unselectable'}>Загрузите файл с картой</Typography>
            <MuiFileInput
                value={file}
                sx={{width: '50%', maxWidth: 600}}
                inputProps={{accept: '.png, .jpeg'}}
                onChange={handleChange}
            />
        </Box>
    );
};

export {ImageUploader};