import React from 'react';
import './App.css';
import NavBar from './common/NavBar';
import Editor from './editor/Editor';
import Download from './app/Download';

class App extends React.Component {
  state = {
    downloadOpen: false,
  }

  handleDownload = () => {
    this.setState({ downloadOpen: !this.state.downloadOpen });
  }
  render() {
    const { downloadOpen } = this.state;

    return (
      <div>
        <header>
          <NavBar onDownload={this.handleDownload}/>
        </header>
        <Editor />
        {downloadOpen ? <Download /> : <></>}
      </div>
    );
  }
}

export default App;
