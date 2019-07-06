import React, { Component } from 'react';
import MyPdfViewer from './components/MyPdfViewer';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <MyPdfViewer />
      </div>
    );
  }
}
