import React, {createContext, ReactNode, useContext, useState} from "react";

interface ImageContextType {
    image: string | null;
    setImage: (image: string | null) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

interface ImageProviderProps {
    children: ReactNode;
}
const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
    const [image, setImage] = useState<string | null>(null);

    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    );
};

const useImage = (): ImageContextType => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImage must be used within an ImageProvider');
    }
    return context;
};

export {
    useImage, ImageProvider
};