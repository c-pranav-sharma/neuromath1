import React, { useState } from 'react';

const VeggieImage = ({ src, alt, emoji }) => {
    const [imgError, setImgError] = useState(false);

    if (imgError) {
        return <div className="text-6xl flex items-center justify-center h-full">{emoji}</div>;
    }
    return (
        <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-32 object-contain drop-shadow-sm"
        />
    );
};

export default VeggieImage;
