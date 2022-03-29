import React, { ReactElement } from 'react'

export interface TabItemProps {
    title?: string;
    closable?: boolean;
    closeBtn?: ReactElement;
}
const TabItem: React.FC<TabItemProps> = (props) => {
    return <>{props.children}</>
}

export default TabItem