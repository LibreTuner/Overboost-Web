import React from 'react';
import './Dialog.css';

class Dialog extends React.Component {
    render() {
        const { title } = this.props;

        return <div className="dialog-wrapper">
            <div className="dialog">
                <div className="dialog-header">
                    <span>{title}</span>
                </div>
                <div className="dialog-content">
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}

export default Dialog;