import React, { SyntheticEvent, useEffect, useState } from 'react'
interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    errorImage?: string;
}

const DEFAULT_SRC = require("@/asset/img/blank.png");
const Image: React.FC<Props> = (props) => {
    let [imgSrc, setImageSrc] = useState<string>(props.src ? props.src : DEFAULT_SRC);
    useEffect(() => {
        setImageSrc(props.src || "");
    }, [props.src])
    let onError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        props.onError?.(e);
        setImageSrc(props.errorImage ? props.errorImage : DEFAULT_SRC);
    }

    return <img {...props} src={imgSrc} onError={onError} />
}

export default Image;