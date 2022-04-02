import classNames from 'classnames';
import React from 'react'
import './index.less'
interface Props {
    src?: string;
    icon?: string;
    iconPre?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
}
const Icon: React.FC<Props> = (props) => {
    return <span
        style={{ fontSize: "15px", ...props.style }}
        className={
            classNames(
                ...props.icon ? [props.iconPre || 'iconfont', props.icon] : [],
                'bui-icon',
                props.className
            )}
        onClick={props.onClick}
    >
        {props.src && <img src={props.src} />}
    </span>
}

export default Icon;