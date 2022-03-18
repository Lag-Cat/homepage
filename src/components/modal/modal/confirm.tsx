import ReactDOM from 'react-dom';
import Modal from './modal'
interface Props {

}
const confirmDialog = () => {
    let container = document.createDocumentFragment();
    let render = () => {
        ReactDOM.render(<Modal></Modal>, container)
    }

    let update = () => {
        render();
    }

    let destory = () => {
        ReactDOM.unmountComponentAtNode(container)
    }
    update();
    return {
        destory,
        update
    }
}

export default confirmDialog;