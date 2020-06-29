import React from 'react';
import './PidMenu.css';
import { selectPid } from '../redux/actions';
import { connect } from 'react-redux';

class PidItem extends React.PureComponent {
    handleInput = (event) => {
        if (this.props.onToggle) {
            this.props.onToggle(event.target.checked);
        }
    }

    render() {
        const { name, checked } = this.props;

        return <li className="pid-item">
            <input type="checkbox" onChange={this.handleInput} checked={checked} /><span>{name}</span>
        </li>
    }
}

class PidMenu extends React.PureComponent {
    handleToggle = (id, checked) => {
        this.props.selectPid(id, checked);
    }

    render() {
        const { pids } = this.props;

        return <ul className="pid-list">
            {pids.map(pid => <PidItem name={pid.name} key={pid.id} checked={pid.checked} onToggle={(checked) => this.handleToggle(pid.id, checked)} />)}
        </ul>
    }
}

const mapDispatchToProps = {
    selectPid
}

export default connect(state => ({ pids: state.pids }), mapDispatchToProps)(PidMenu);