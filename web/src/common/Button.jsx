import React from 'react';
import './Button.css';

export default function ({ children, ...rest }) {
    return <div className="button" {...rest}>{children}</div>
}