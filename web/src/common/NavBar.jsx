import React from 'react'
import './NavBar.css'
import { ReactComponent as Logo } from '../assets/libretuner.svg'

export default class NavBar extends React.Component {
    render() {
        return <nav className="navbar">
            {/*<Container>*/}
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Logo className="navbar-logo" />
                    <span className="navbar-brand-title">Overboost</span>
                </div>
                <div className="navbar-buttons">
                    <span className="navbar-button" onClick={this.props.onDownload}>Download</span>
                </div>
            </div>
            {/*</Container>*/}
        </nav>
    }
}