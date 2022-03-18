import useModal from '@/components/modal/modal/useModal';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import confirmDialog from '../../../components/modal/modal/confirm'


const PageEditor = () => {
    let [root] = useState(document.getElementById("root") || document.createElement("div"))
    return ReactDOM.createPortal(
        <div style={{ height: "100px", width: "100px", background: "#fff" }}></div>,
        root
    )
}

export default PageEditor