import React, { ReactNode, useEffect, useState } from "react"
import Dialog from 'rc-dialog'
import ReactDOM from "react-dom";
import './index.less'
import Button from "@/components/button/button/button";
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
const Modal: React.FC<ModalConfig & { ref?: React.Ref<HTMLDivElement> }> = React.forwardRef((props, ref) => {
    const [dom, setDom] = useState<HTMLDivElement>(document.createElement("div"));
    let close = () => {
    }

    let onClose = () => {
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

    return ReactDOM.createPortal(
        <div className="bui-modal" ref={ref} onClick={props.onClick} style={props.visible ? {} : { display: "none" }}>
            <div className="bui-modal-header">
                <div className="bui-modal-header-title">

                </div>
                <button className="bui-modal-header-close" onClick={onClose}>
                    <span className="iconfont icon-guanbi"></span>
                </button>
            </div>
            <div className="bui-modal-content">
                {props.content}
            </div>
            {
                (props.cancel || props.ok) && <div className="bui-modal-footer">
                    {props.cancel && <Button type="info" plain block radius onClick={onCancel}>取消</Button>}
                    {props.ok && <Button type="info" block radius onClick={onConfirm}>保存</Button>}
                </div>
            }
        </div>,
        dom
    )
});

const getConfirm = (config: ModalConfig) => {
    return <Modal {...config} />
}

const confirm = (withConfig: ModalConfig) => {
    return getConfirm({
        ok: true,
        cancel: true,
        ...withConfig
    })
}

export { confirm }

export default Modal