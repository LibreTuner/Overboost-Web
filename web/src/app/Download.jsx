import React from 'react';
import './Download.css';
import { localApi } from '../api/local';
import Button from '../common/Button';
import Dialog from '../common/Dialog';
import Select from '../common/Select';

class Download extends React.Component {
    state = {
        devices: [
            {
                name: 'Loading...',
                id: ''
            }
        ],
        device_id: '',
        platform: '',
    }

    async componentDidMount() {
        const response = await localApi.get('devices');
        const devices = response.data;
        var device_id = '';
        if (devices.length > 0) {
            device_id = devices[0].id;
        }
        this.setState({ devices, device_id });
    }

    handleDownload = async () => {
        const { device_id } = this.state;
        const socket = new WebSocket('ws://localhost:8080/api/v1/download?device_id=' + encodeURIComponent(device_id) + '&algorithm=MazdaRMA');
        this.socket = socket;
        socket.addEventListener('open', event => {
            console.log("Connection opened");
        });
        socket.onmessage = async event => {
            const message = JSON.parse(await event.data.text());
            console.log('Server message:', message);
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        console.log(name, value);

        this.setState({
            [name]: value
        });
    }

    render() {
        const { devices, device_id, platform } = this.state;

        return <Dialog title="Download Calibration">
            <label htmlFor="download-device">Device:</label>
            <Select id="download-device" name="device_id" onChange={this.handleChange} value={device_id}>
                {devices.map((device) => <option value={device.id} key={device}>{device.name}</option>)}
            </Select>
            <label htmlFor="download-platform">Platform:</label>
            <Select id="download-platform" name="platform" onChange={this.handleChange} platform={platform}>
                <option value="mazdaspeed6" key="mazdaspeed6">Mazdaspeed6 / Mazda 6 MPS / Mazdaspeed Atenza</option>
            </Select>
            <Button style={{ marginTop: "8px" }} onClick={this.handleDownload}>Download</Button>
        </Dialog>
    }
}

export default Download;