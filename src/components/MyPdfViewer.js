import React from 'react';
import { PDFReader } from 'reactjs-pdf-reader';

export default class MyPdfViewer extends React.Component {
  render() {
    return (
      <div style={{ overflow: 'scroll', height: 600 }}>
        <PDFReader url="../download.pdf" ></PDFReader>
      </div>
    );
  }
}
