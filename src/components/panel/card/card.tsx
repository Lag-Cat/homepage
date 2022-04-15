import classNames from 'classnames';
import React from 'react'
import './index.less'
interface Props {
    className?: string;
}
const Card: React.FC<Props> = (props) => {
    return <div className={classNames("bui-card", props.className)} >
        {props.children}
    </div >
}

export default Card;