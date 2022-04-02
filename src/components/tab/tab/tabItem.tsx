import React, { ReactElement, ReactNode } from 'react'

export interface TabItemProps {
    title?: string | ReactNode | ReactElement;
    closable?: boolean;
    closeBtn?: ReactElement;
}
const TabItem: React.FC<TabItemProps> = (props) => {
    return <>{props.children}</>
}

export default TabItem