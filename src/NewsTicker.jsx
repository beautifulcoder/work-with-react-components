import React from 'react';

export class NewsTicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      tickerIndex: 0
    };

    this.timer = 0;
    this.newsRef = React.createRef();
  }

  async componentDidMount() {
    const payload = await fetch('/news.json');
    const data = await payload.json();

    this.setState({news: data});

    this.timer = setInterval(() => this.setState(
      {tickerIndex: this.state.tickerIndex + 1}), 2000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {freeze} = nextProps;

    if (freeze) {
      console.log('Ticker frozen at: ' +
        nextState.news[nextState.tickerIndex % nextState.news.length]);
      return false;
    }

    return true;
  }

  static getDerivedStateFromProps(props, state) {
    const {reset} = props;

    if (reset) {
      return {...state, tickerIndex: 0};
    }

    return null;
  }

  render() {
    const {throwBomb} = this.props;

    if (throwBomb) {
      throw new Error('Bomb!');
    }

    return (
      <ul>
        <li ref={this.newsRef}>
          {this.state.news[this.state.tickerIndex % this.state.news.length]}
        </li>
      </ul>
    );
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.news.length > 0
      && prevState.news.length !== this.state.news.length) {
      return this.newsRef.current.textContent;
    }

    return null;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.tickerIndex % 2 === 0
      && prevState.news.length === this.state.news.length) {
      const payload = await fetch('/news.json');
      const data = await payload.json();

      if (data.length !== this.state.news.length) {
        console.log('Breaking news update detected.');
        this.setState({news: data});
      }
    }

    if (snapshot !== null) {
      console.log('DOM snapshot before update: ' + snapshot);
    }
  }

  componentWillUnmount() {
    console.log('Unmount component.');
    clearInterval(this.timer);
  }
}
