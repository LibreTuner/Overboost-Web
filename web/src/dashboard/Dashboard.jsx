import React from 'react';
import './Dashboard.css';
import Container from '../common/Container';
import FileSelect from '../common/FileSelect';
import { upload } from '../api/remote';

class ProjectRow extends React.PureComponent {
    render() {
        const { name, platform, lastModified, onClick } = this.props;

        return <tr className="project-row" onClick={onClick}>
            <td>{name}</td>
            <td>{platform}</td>
            <td>{lastModified}</td>
        </tr>
    }
}

class Projects extends React.PureComponent {
    render() {
        return <table className="projects">
            <thead>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Platform</th>
                    <th scope='col'>Last Modified</th>
                </tr>
            </thead>
            <tbody>
                <ProjectRow name="TEST-1" platform="Mazdaspeed6" lastModified="2020-07-18 06:04 PM" />
            </tbody>
        </table>
    }
}

class UploadProgress extends React.PureComponent {
    render() {
        const { progress } = this.props;

        return <div className="upload-progress">
            <div className="upload-progress-bar" style={{ width: (progress * 100) + '%' }} />
            <span className="upload-progress-border"></span>
        </div>
    }
}

export default class Dashboard extends React.Component {
    state = {
        uploadProgress: 0,
    }

    handleUpload = (file) => {
        upload(file, (progressEvent) => {
            console.log(progressEvent);
            this.setState({
                uploadProgress: progressEvent.loaded / progressEvent.total,
            });
        });
    }

    render() {
        const { uploadProgress } = this.state;

        return <div className="dashboard">
            <Container>
                <span className="dashboard-sep">Choose an existing project</span>
                <Projects />
                <span className="dashboard-sep">...OR</span>
                <FileSelect onFileSelect={this.handleUpload} />
                <UploadProgress progress={uploadProgress} />
            </Container>
        </div>
    }
}