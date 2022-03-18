import React, { ReactNode, useState } from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Modal, { ModalConfig } from './modal'

interface ConfirmModalConfig extends ModalConfig { }
const useModal = () => {
    let [container] = useState<DocumentFragment>(document.createDocumentFragment())
    const getConfirmModal =
        (withFunc: ConfirmModalConfig) =>
            (configModalProps?: ConfirmModalConfig) => {
                let render = () => {
                    ReactDOM.unmountComponentAtNode(container)
                    ReactDOM.render(<Modal {...{ ...withFunc, ...configModalProps }} />, container)
                }

                let update = () => {
                    render();
                }

                let destory = () => {
                }

                if (configModalProps) {
                    update();
                }

                return {
                    destory,
                    update
                }
            }

    const fns = {
        confirm: getConfirmModal(withConfirm)
    }

    return [fns]
}

const withConfirm = {
    ok: true,
    cancel: true,
}

export default useModal;