import {useContext} from "react";

import {ImageContext, ImageContextType} from "./ImageContext";

const useImage = (): ImageContextType => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImage must be used within an ImageProvider');
    }
    return context;
};

export default useImage;