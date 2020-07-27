import React from 'react';
import './FileSelect.css';
import { createRef } from 'react';

export default class FileSelect extends React.Component {
    inputRef = createRef();

    handleClick = () => {
        this.inputRef.current.click();
    }

    handleChange = () => {
        const files = this.inputRef.current.files;

        if (files.length > 0 && this.props.onFileSelect) {
            this.props.onFileSelect(files[0]);
        }
    }

    render() {
        return <div className="file-select" onClick={this.handleClick}>
            <input type="file" ref={this.inputRef} style={{ opacity: 0 }} onChange={this.handleChange} />
            <span><b>Choose a file</b> or drag it here</span>
        </div>
    }
}