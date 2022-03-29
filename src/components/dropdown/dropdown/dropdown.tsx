import React, { useRef } from 'react'
import Dialog from 'rc-dialog'
import classNames from 'classnames';
interface Props {

}
const Dropdown: React.FC<Props> = (props) => {
    window.addEventListener('click', (e) => { })
    return <>
        {props.children}
        <Dialog />
    </>
}



export default Dropdown