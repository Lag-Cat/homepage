import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import './index.less'
interface Props {
    type?: ButtonType,
    size?: ButtonSize,
    className?: string,
    style?: CSSProperties,
    plain?: boolean;
    block?: boolean;
    radius?: number | boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
}

declare type ButtonType = 'info' | 'primary' | 'warning' | 'dangour'
declare type ButtonSize = 'mini' | 'middle' | 'large' | 'max'

const DEFAULT_RADIUS = 5

const Button: React.FC<Props> = (props) => {
    return <div
        className={
            classNames('bui-button'
                , (props.type && !props.plain) && `bui-button-${props.type}`
                , (props.type && props.plain) && `bui-button-plain-${props.type}`
                , props.size ? `bui-button-size-${props.size}` : "bui-button-size-middle"
                , props.block && 'bui-button-block'
                , props.className
            )
        }
        style={{
            ...getRadius(props.radius),
            ...props.style
        }}
        onClick={props.onClick}
    >
        {props.children}
    </div>
}

const getRadius = (radius: number | boolean | undefined) => {
    console.log(radius, 111)
    if (radius && typeof (radius) === 'number') {
        return { borderRadius: radius + 'px' }
    } else if (radius === true) {
        return {
            borderRadius: `${DEFAULT_RADIUS}px`
        }
    }
    return {}
}

export default Button;