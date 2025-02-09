import React, {useState} from "react";
import useImage from "./useImage";
import SplitComponent from "../utils/SplitComponent";
import {Box, Button} from "@mui/material";
import drawTable from "../../processor/drawTable";

const ImageProcessor: React.FC = () => {
    const {userImage, editedImage, setEditedImage} = useImage();
    const [rows, setRows] = useState<number>(5);
    const [columns, setColumns] = useState<number>(5);

    const src = (editedImage ? editedImage : userImage);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{marginBottom: '10px', display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                <SplitComponent
                    title={"Число строк"}
                    minimum={1}
                    maximum={20}
                    changeValue={
                        (arg0: number) => setRows(arg0)
                    }
                />
                <SplitComponent
                    title={"Число колонок"}
                    minimum={1}
                    maximum={20}
                    changeValue={
                        (arg0: number) => setColumns(arg0)
                    }
                />
            </Box>
            <img
                src={src ? src : undefined}
                alt="Uploaded"
                style={{maxWidth: '100%', marginBottom: '10px'}}
            />
            <Button onClick={() => setEditedImage(drawTable(userImage || "", rows, columns))}>Download Edited Image</Button>
        </Box>
    );
};

export {ImageProcessor};