import React, { useEffect, useRef, useState } from 'react'
import { TabItemProps } from './tabItem'
import './index.less'
import classNames from 'classnames';
import { getElementByClassName } from '@/components/utils/getElementByClassName';
interface TabProps {
    active?: number | string;
    onTabChange?: (activeKey: number) => any;
    className?: string;
    mode?: 'card' | 'line'
}
const Tab: React.FC<TabProps> = (props) => {
    let [linePosition, _setLinePosition] = useState<number>(0);
    let [lineWidth, _setLineWidth] = useState<number>(0);

    const handleTabChange = (key: number) => {
        const { onTabChange } = props;
        onTabChange?.(key);
    }

    useEffect(() => {
        let dom = getElementByClassName("bui-tab-active", 0)
        if (dom) {
            setLinePosition((dom as any).offsetLeft)
            setLineWidth((dom as any).clientWidth)
        }
    }, [props.active])

    const setLinePosition = (position: number) => {
        _setLinePosition(position + 10)//padding
    }

    const setLineWidth = (position: number) => {
        _setLineWidth(position - 20)//padding
    }

    return <div className={classNames('bui-tab', props.className)}>
        <ul className="bui-tab-tabs">
            {React.Children.map(props.children, (element: any, index) => {
                return (!props.mode || props.mode === 'card') ? <li
                    className={classNames("bui-tab-card", index == props.active ? "bui-tab-card-active" : "")}
                    onClick={() => handleTabChange(index)}
                >
                    {element.props.title}
                    {
                        element.props.closable ?
                            element.props.closeBtn ?
                                element.props.closeBtn : <div></div>
                            : null
                    }
                </li>
                    : <li
                        className={classNames("bui-tab-line", index == props.active ? "bui-tab-active" : "")}
                        onClick={() => handleTabChange(index)}
                    >
                        {element.props.title}
                    </li>
            })}
            {props.mode === 'line' ? <div
                className="bui-tab-underline"
                style={{ transform: `translateX(${linePosition}px)`, width: `${lineWidth}px`, transitionDuration: "0.3s" }}
            ></div> : null}
        </ul>
        <div className='bui-tab-panels'>
            {React.Children.map(props.children, (element: any, index) => {
                return <div
                    className={classNames('bui-tab-panel', index == props.active ? 'bui-tab-panels-active' : "")}
                    key={index}>
                    {element.props.children}
                </div>;
            })}
        </div>
    </div>
}


export default Tab;