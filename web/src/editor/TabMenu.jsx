import React from 'react'
import './TabMenu.css'
import { FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons';

class TabBar extends React.Component {
    handleClick = (event) => {
        const id = event.currentTarget.getAttribute('section');
        if (this.props.onSelectTab) {
            this.props.onSelectTab(id);
        }
    }

    handleClose = (event) => {
        const id = event.currentTarget.getAttribute('section');
        if (this.props.onClose) {
            this.props.onClose(id);
        }
    }

    render() {
        const { tabs, selected } = this.props;

        return <div className="tab-bar">
            {tabs.map(tab =>
                <div className={"tab-menu-action" + (tab.id === selected ? ' selected' : '')} key={tab.id}>
                    <div className="tab-menu-select" onClick={this.handleClick} section={tab.id} />
                    {tab.icon ? <tab.icon style={{ marginRight: '8px' }} /> : <div></div>}
                    <span>{tab.name}</span>
                    <IconContext.Provider value={{ className: "tab-menu-action-close" }}>
                        <FaTimes onClick={this.handleClose} section={tab.id} />
                    </IconContext.Provider>
                </div>
            )}
        </div>
    }
}

export default class TabMenu extends React.Component {
    render() {
        const { tabs, selected, children, ...rest } = this.props;

        return <div className="tab-menu" {...rest}>
            <TabBar tabs={tabs} selected={selected} onSelectTab={this.props.onSelectTab} onClose={this.props.onClose} />
            {children}
        </div>
    }
}