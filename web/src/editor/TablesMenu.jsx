import React from 'react'
import './TablesMenu.css'
import { FaChevronDown, FaLayerGroup, FaChevronRight } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getCategorizedTables } from '../redux/selectors';
import { openTable } from '../redux/actions';

class TablesCategory extends React.Component {
    state = {
        collapsed: false,
    }

    handleCollapse = (event) => {
        this.setState((state, props) => {
            return { collapsed: !state.collapsed };
        });
    }

    handleActivate = (event) => {
        if (this.props.onActivate) {
            this.props.onActivate(event.currentTarget.getAttribute('tableid'));
        }
    }

    render() {
        const { name, tables } = this.props;
        const { collapsed } = this.state;

        return <li className="tables-tree-category">
            <div className="tables-tree-category-header" onClick={this.handleCollapse}>{collapsed ? <FaChevronRight /> : <FaChevronDown />}{name}</div>
            <ul className="tables-tree-category-container" style={collapsed ? { 'display': 'none' } : {}}>
                {tables.map((table) =>
                    <li className="tables-tree-item" tableid={table.id} key={table.id} onClick={this.handleActivate}><FaLayerGroup />{table.name}</li>
                )}
            </ul>
        </li>
    }
}

class TablesTree extends React.Component {
    render() {
        const { tables } = this.props;

        return <ol className="tables-tree">
            {tables.map((category) =>
                <TablesCategory name={category.name} tables={category.tables} key={category.name} onActivate={this.props.onActivate}></TablesCategory>
            )}

        </ol>
    }
}

class TablesMenu extends React.Component {
    handleActivate = (id) => {
        this.props.openTable(id);
        console.log(id);
    }

    render() {
        /*const tables = [
            {
                name: 'Injection Timing',
                tables: [
                    {
                        name: 'Open Loop Timing (Overload)',
                        id: 'open_loop_timing_overload',
                    }
                ]
            }
        ];*/
        const { tables } = this.props;

        return <div className="tables-menu">
            <input className="tables-menu-search-input" placeholder="Search" />
            <TablesTree tables={tables} onActivate={this.handleActivate} />
        </div>
    }
}

const mapDispatchToProps = {
    openTable,
}

export default connect(state => ({ tables: getCategorizedTables(state) }), mapDispatchToProps)(TablesMenu);