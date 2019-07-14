import React from 'react';

export class ErrorBoundary extends React.Component {
  state = {
    hasBomb: false
  };

  static getDerivedStateFromError(error) {
    return error ? {hasBomb: true} : {hasBomb: false};
  }

  componentDidCatch(error, info) {
    console.log('Caught error: ' + error.message);
    console.log('Component stack - ' + info.componentStack);
  }

  render() {
    if (this.state.hasBomb) {
      // Diffuse bomb with user-friendly message
      return <p>Unable to show news ticker.</p>;
    }

    return this.props.children;
  }
}
