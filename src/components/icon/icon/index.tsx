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
    return <div style={{ ...props.style }} className={classNames('bui-icon', props.className)} onClick={props.onClick}>
        {props.src && <img src={props.src} />}
        {props.icon && <div className={classNames(props.iconPre || 'iconfont', props.icon)}></div>}
    </div>
}

export default Icon;