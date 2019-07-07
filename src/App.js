import React from 'react';
import { Container, Header, Form, Button } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';

export default class App extends React.Component {
  state = {
    file: null,
    numPages: 0,
    pageNumber: 1,
  };

  onFileChange = event => {
    this.setState({
      file: event.target.files[0],
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  nextPage = () => {
    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;

    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }

    this.setState({
      pageNumber: nextPageNumber,
    });
  };

  previousPage = () => {
    const currentPageNumber = this.state.pageNumber;
    let previousPageNumber;

    if (currentPageNumber - 1 > this.state.numPages) {
      previousPageNumber = 1;
    } else {
      previousPageNumber = currentPageNumber - 1;
    }

    this.setState({
      pageNumber: previousPageNumber,
    });
  };

  openSelectedPage = event => {
    const currentPageNumber = event.target.parentNode.parentNode.dataset.pageNumber;
    console.log(event.target.parentNode.parentNode);
    console.log(currentPageNumber);

    this.setState({
      pageNumber: +currentPageNumber,
    });
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <Container>
        <br />
        <Header textAlign="center">PDF Preview</Header>
        <Form>
          <input type="file" onChange={this.onFileChange} />
        </Form>
        <main>
          <div>
            <Document
              file={this.state.file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              noData={<h4>Please select a file</h4>}
              renderMode="svg"
            >
              <Page pageNumber={pageNumber} />
            </Document>
            {this.state.file ? (
              <div className="navigation">
                <div>
                  <Button onClick={this.previousPage}>Previous</Button>
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                  <Button onClick={this.nextPage}>Next</Button>
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <Document
              file={this.state.file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              noData={<h4>Please select a file</h4>}
              renderMode="canvas"
              scale="0.3"
              className="miniaturesContainer"
            >
              {Array.from(
                new Array(numPages),

                (el, index) => (
                  <div>
                    <Page
                      className="miniatures"
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      scale="0.3"
                      onClick={this.openSelectedPage}
                    />
                    <span className="previewNumber">{index + 1}</span>
                  </div>
                )
              )}
            </Document>
          </div>
        </main>
      </Container>
    );
  }
}
