import classNames from 'classnames'
import React, { ReactElement, ReactNode } from 'react'
import './index.less'
interface Props {
    dot?: boolean | number | ReactElement;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => any,
    position?: PositionT;
}

declare type PositionT = 'tl' | 'tr' | 'bl' | 'br'

const Badge: React.FC<Props> = (props) => {
    return <div className={classNames("bui-badge", props.className)}>
        {
            (props.dot === false || props.dot === null || props.dot === undefined) ? null :
                props.dot === true ?
                    <div className={classNames("bui-badge-dot", getPositionClass(props.position), "bui-badge-dot-default")} onClick={(e) => props.onClick && props.onClick(e)}></div> :
                    typeof (props.dot) === 'number' ?
                        <div className={classNames("bui-badge-dot-count", getPositionClass(props.position))} onClick={(e) => props.onClick && props.onClick(e)}>{props.dot}</div> :
                        <div className={classNames("bui-badge-dot", getPositionClass(props.position), "bui-badge-dot-count")} onClick={(e) => props.onClick && props.onClick(e)}>{props.dot}</div>
        }
        {props.children}
    </div>
}

const getPositionClass = (position?: PositionT) => {
    return position ? (`bui-badge-p-` + position) : 'bui-badge-p-tr'
}

export default Badge;