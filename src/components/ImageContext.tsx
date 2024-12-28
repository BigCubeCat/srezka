import React, { useState, useContext, createContext } from 'react';

// Create a Context for managing image state
const ImageContext = createContext();

// Provider component
const ImageProvider = ({ children }) => {
    const [image, setImage] = useState(null);

    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    );
};
