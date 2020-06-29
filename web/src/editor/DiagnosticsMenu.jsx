import React from 'react';
import './DiagnosticsMenu.css';
import Button from '../common/Button';
import PidMenu from './PIdMenu';

export default class DiagnosticsMenu extends React.Component {
    render() {
        return <div className="diagnostics-menu">
            <Button>Scan Diagnostic Trouble Codes</Button>
            <PidMenu />
        </div>
    }
}