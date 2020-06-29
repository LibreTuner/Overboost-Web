import React from 'react';
import './TableEditor.css';
import DataGrid from './DataGrid';
import { connect } from 'react-redux';

class TableEditor extends React.PureComponent {
    render() {
        const { table } = this.props;

        return <div className="table-editor">
            <DataGrid table={table}/>
        </div>
    }
}

function mapStateToProps(state, ownProps) {
    const { tableId } = ownProps;

    return {table: state.tables[tableId]};
}

export default connect(mapStateToProps)(TableEditor)