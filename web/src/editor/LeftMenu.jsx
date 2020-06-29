import React from 'react'
import './LeftMenu.css'
import { FaTable, FaColumns, FaBong } from 'react-icons/fa'
import TablesMenu from './TablesMenu';
import DiagnosticsMenu from './DiagnosticsMenu';

class LeftMenuTabs extends React.Component {
    handleClick = (event) => {
        const id = event.currentTarget.getAttribute('section');
        if (this.props.onSelect) {
            this.props.onSelect(id);
        }
    }

    render() {
        const { tabs, selected } = this.props;

        return <div className="left-menu-tabs">
            {tabs.map(tab =>
                <div className={"left-menu-tab-menu-action" + (tab.id === selected ? ' selected' : '')} key={tab.id} onClick={this.handleClick} section={tab.id}>
                    <tab.icon size="1.5rem" />
                </div>
            )}
        </div>
    }
}

export default class LeftMenu extends React.Component {
    state = {
        selected: 'tables',
    };

    handleSelect = (id) => {
        this.props.setSubview(id);
        this.setState({ selected: id });
    }

    render() {
        const { selected } = this.state;

        const tabs = [
            {
                name: 'Tables',
                id: 'tables',
                icon: FaTable,
            },
            {
                name: 'Axes',
                id: 'axes',
                icon: FaColumns,
            },
            {
                name: 'Diagnostics',
                id: 'diagnostics',
                icon: FaBong,
            },
        ];

        return <div className="left-menu">
            <LeftMenuTabs tabs={tabs} selected={selected} onSelect={this.handleSelect}/>
            <div className="left-menu-container" style={selected === 'tables' ? {} : {display: 'none'}}>
                <TablesMenu/>
            </div>
            <div className="left-menu-container" style={selected === 'diagnostics' ? {} : {display: 'none'}}>
                <DiagnosticsMenu/>
            </div>
        </div>
    }
}