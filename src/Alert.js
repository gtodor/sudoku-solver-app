import React from "react";
import Toast from "react-bootstrap/Toast";

class Alert extends React.Component {
  constructor(props) {
    super(props);
    console.log("creating alert");
    this.state = {
      elapsedTime: 0
    };
  }

  componentDidMount() {
    const intervalId = setInterval(this.incrementMinutes, 60000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  incrementMinutes = () => {
    this.setState({ elapsedTime: this.state.elapsedTime + 1 });
  };

  closeHandler = () => {
    this.props.onClose(this.props.id);
  };

  render() {
    return (
      <Toast onClose={this.closeHandler} animation={true} delay={15000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Sudoku solver</strong>
          <small>{this.state.elapsedTime === 0 ? "just now" : `${this.state.elapsedTime} minutes`}</small>
        </Toast.Header>
        <Toast.Body className="whiteBody">{this.props.message}</Toast.Body>
      </Toast>
    );
  }
}

export default Alert;
