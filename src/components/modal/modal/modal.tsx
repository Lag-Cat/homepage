import React, { ReactNode, useEffect, useState } from "react"
import ReactDOM from "react-dom";
import './index.less'
import Button from "@/components/button/button/button";
import Dialog from 'rc-dialog'
export interface ModalConfig {
    ok?: boolean;
    okText?: string | ReactNode;
    cancel?: boolean;
    cancelText?: string | ReactNode;
    content?: string | ReactNode;
    title?: string | ReactNode;
    showCloseButton?: boolean;
    closeButton?: string | ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
    onClose?: () => boolean | void;
    onConfirm?: () => boolean | void;
    onCancel?: () => boolean | void;
    visible?: boolean
}
let container: HTMLDivElement;
// let dom = document.createElement("div");
const Modal: React.FC<ModalConfig> = (props) => {
    const [dom, setDom] = useState<HTMLDivElement>(document.createElement("div"));
    let close = () => {
    }

    let onClose = () => {
        console.log("asd")
        if (props.onClose && props.onClose() === false)
            return;
        close();
    }

    let onCancel = () => {
        if (props.onCancel && props.onCancel() !== false)
            return;
        close();
    }

    let onConfirm = () => {
        if (props.onConfirm && props.onConfirm() !== false)
            return;
        close();
    }

    useEffect(() => {
        if (!container) {
            container = document.createElement("div");
            document.getElementById("root")?.appendChild(container);
        }

        container.appendChild(dom);

        setDom(dom);

        return () => {
            dom?.remove();
        }
    })


    const closeIcon = <div className="bui-modal-header-close" onClick={onClose}>
        <span className="iconfont icon-guanbi"></span>
    </div>

    return <Dialog
        {...props}
        // mousePosition={{ x: window.screenX / 2, y: window.screenY / 2 }}
        title={_Title(props.title)}
        onClose={onClose}
        closeIcon={closeIcon}
        className="bui-modal">
        <div className="bui-modal-content">
            {props.children}
        </div>
        {
            (props.cancel || props.ok) && <div className="bui-modal-footer">
                {props.cancel && <Button type="info" plain block radius onClick={onCancel}>取消</Button>}
                {props.ok && <Button type="info" block radius onClick={onConfirm}>保存</Button>}
            </div>
        }
    </Dialog >
}

const _Title = (title: string | ReactNode) => {
    return <div className="bui-modal-header">
        <div className="bui-modal-header-title">
            {title}
        </div>
    </div>
}

const getConfirm: React.FC<ModalConfig> = (config) => {
    return <Modal {...config} />
}

const confirm: React.FC<ModalConfig> = (withConfig) => {
    return getConfirm({
        ok: true,
        cancel: true,
        ...withConfig
    })
}



export { confirm }

export default Modal