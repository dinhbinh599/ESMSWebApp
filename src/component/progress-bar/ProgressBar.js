import { Steps } from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router";
const Step = Steps.Step;
class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step1: "",
      step2: "",
      //step3: "",
      isUpdate: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location !== prevState.location) {
      return { someState: nextProps.location };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      console.log(this.props.location);
      if (typeof this.props.location.state !== "undefined")
        this.setState({ isUpdate: this.props.location.state.isUpdate });
    }
  }

  render() {
    var { isUpdate } = this.state;
    return (
      <Steps
        current={parseInt(this.props.current)}
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        {/* <Step title="Project Detail" /> */}
        <Step title="Select Employee" />
        <Step title="Confirm" />
      </Steps>
    );
  }
}

export default withRouter(ProgressBar);
