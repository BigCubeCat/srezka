import React from 'react';
import {Box, Typography} from "@mui/material";
import {Route, Switch} from "wouter";
import Main from "./components/Main.tsx";


const App: React.FC = () => {
    return (
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
                    <Route path="/" component={Main}/>
                    <Route>404: No such page!</Route>
                </Switch>
            </Box>
        </Box>
    );
};

export default App;
