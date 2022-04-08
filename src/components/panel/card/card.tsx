import React from 'react'
import './index.less'
interface Props {

}
const Card: React.FC<Props> = (props) => {
    return <div className='bui-card'>
        {props.children}
    </div>
}

export default Card;