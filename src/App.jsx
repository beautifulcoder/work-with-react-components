import React from 'react';
import './App.css';
import { NewsTicker } from './NewsTicker';
import { ErrorBoundary } from './ErrorBoundary';

export default class App extends React.Component {
  state = {
    reset: false,
    freeze: false,
    throwBomb: false,
    unmount: false
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Breaking News</h2>

          <p>
            <input type={"checkbox"}
              onChange={() => this.setState({reset: !this.state.reset})} />
            <label>reset</label>

            <input type={"checkbox"}
              onChange={() => this.setState({freeze: !this.state.freeze})} />
            <label>freeze</label>

            <input type={"checkbox"}
              onChange={() => this.setState({throwBomb: !this.state.throwBomb})} />
            <label>throw bomb</label>

            <input type={"checkbox"}
              onChange={() => this.setState({unmount: !this.state.unmount})} />
            <label>unmount</label>
          </p>

          {!this.state.unmount && (
            <ErrorBoundary>
              <NewsTicker reset={this.state.reset}
                freeze={this.state.freeze}
                throwBomb={this.state.throwBomb} />
            </ErrorBoundary>
          )}

          <p style={{position: "absolute", bottom: 0}}>
            Working with React Components
          </p>
        </header>
      </div>
    );
  }
}
