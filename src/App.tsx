import React from 'react';
import {Box, Typography} from "@mui/material";
import {ImageProvider} from "./components/image/ImageContext";
import {Route, Switch} from "wouter";
import {ImageUploader} from "./components/image/ImageUploader.tsx";
import {ImageProcessor} from "./components/image/ImageProcessor.tsx";


const App: React.FC = () => {
    return (
        <ImageProvider>
            <Box sx={{width: "100vw", height: "100vh"}}>
                <Box sx={{
                    width: '100vw',
                    height: '5em',
                    backgroundImage: 'url(logo.png)',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                     onClick={() => console.log('')}>
                    <Typography variant={'h2'} className={'unselectable'}>Срезка</Typography>
                </Box>
                <Box sx={{width: '100vw'}}>
                    <Switch>
                        <Route path="/" component={ImageUploader}/>
                        <Route path="/proc" component={ImageProcessor}/>
                        <Route>404: No such page!</Route>
                    </Switch>
                </Box>
            </Box>
        </ImageProvider>
    );
};

export default App;
