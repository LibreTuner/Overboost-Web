import React from 'react';
import './Select.css';

export default function ({ children, ...rest }) {
    return <div className="select-wrapper">
        <select {...rest}>
            {children}
        </select>
    </div>
}