import React from 'react'
import './Editor.css'
import LeftMenu from './LeftMenu'
import TabMenu from './TabMenu'
import { FaLayerGroup } from 'react-icons/fa'
import TableEditor from './TableEditor'
import { connect } from 'react-redux'
import { getOpenedTablesMeta } from '../redux/selectors'
import { selectTable, closeTable } from '../redux/actions'
import ToolsMenu from './ToolsMenu'
import DataLog from './DataLog'

class Editor extends React.Component {
    handleSelect = (id) => {
        this.props.selectTable(id);
    }

    handleClose = (id) => {
        this.props.closeTable(id);
    }

    handleSetSubview = (id) => {
        this.setState({ subview: id });
    }

    state = {
        subview: 'tables',
    }

    render() {
        const { openedTables, selectedTable } = this.props;
        const { subview } = this.state;

        return <div className="editor">
            <LeftMenu setSubview={this.handleSetSubview} />
            <TabMenu
                tabs={openedTables}
                selected={selectedTable}
                onSelectTab={this.handleSelect}
                onClose={this.handleClose}
                style={subview === 'tables' ? {} : { display: 'none' }}>
                {openedTables.map(table =>
                    <div key={table.id} className="editor-table-container" style={selectedTable === table.id ? {} : { display: 'none' }}>
                        <TableEditor tableId={table.id} />
                    </div>
                )}
            </TabMenu>
            <DataLog style={subview === 'diagnostics' ? {} : { display: 'none' }} />
            <ToolsMenu tableId={selectedTable} />
        </div>
    }
}

function mapStateToProps(state) {
    return { openedTables: getOpenedTablesMeta(state), selectedTable: state.selectedTable };
}

const mapDispatchToProps = {
    selectTable,
    closeTable,
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)