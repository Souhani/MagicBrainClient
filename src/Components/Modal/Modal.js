import React from 'react';
import ReactDom from 'react-dom';
import './Modal.css';

const ModalRoot = document.getElementById('modal_root');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        ModalRoot.appendChild(this.el)
    }
    componentWillUnmount() {
        ModalRoot.removeChild(this.el)
    }
    render() {
        return ReactDom.createPortal(this.props.children, this.el)
    }
}

export default Modal;