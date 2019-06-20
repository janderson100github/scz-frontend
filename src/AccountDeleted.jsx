import React from "react";
import NavigationBar from "./NavigationBar";

class AccountView extends React.Component {

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
        <NavigationBar cn="account" title="Account - Deleted"/>

        Account {this.state.publicId} deleted
      </div>

    );
  }
}

export default AccountView;
