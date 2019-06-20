import React from "react";
import NavigationBar from "./NavigationBar";

class PoolView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      publicId: "",
      error: null
    };
  }

  componentDidMount() {
    this.setState({
      publicId: this.props.match.params.publicId
    });
  }

  render() {
    return (
      <div>
        <NavigationBar cn="pool" title="Credit - Deleted"/>

        Credit {this.state.publicId} deleted
      </div>

    );
  }
}

export default PoolView;
