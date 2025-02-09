import React, {createContext, ReactNode, useState} from "react";

interface ImageContextType {
    userImage: string | null;
    setUserImage: (image: string | null) => void;
    editedImage: string | null;
    setEditedImage: (image: string | null) => void;

}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

interface ImageProviderProps {
    children: ReactNode;
}
const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
    const [userImage, setUserImage] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);

    console.log(
        "userImage", userImage
    )

    return (
        <ImageContext.Provider value={{
            userImage,
            setUserImage,
            editedImage,
            setEditedImage
        }}>
            {children}
        </ImageContext.Provider>
    );
};

export {
    ImageProvider, ImageContext, ImageContextType
};