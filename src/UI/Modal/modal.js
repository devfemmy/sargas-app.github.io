import React, {Component} from 'react';
import './modal.css';
import Backdrop from '../Backdrop/backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    componentWillUpdate() {
        console.log('Modal will update');
    }
    render () {
        return (<div>
            <Backdrop 
            show = {this.props.show} 
            clicked = {this.props.modalClosed}/>
                <div className = "Modal"
                 style = {{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
                </div>
            </div>);
    
    }
} 

export default Modal;