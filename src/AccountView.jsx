import React from "react";
import queryString from "query-string";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import Account from "./Account";

class AccountView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      account: {},
      editId: null,
      error: null
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    this.state.editId = queryParams.editId;
    this.get(this.props.match.params.publicId);
  }

  get(publicId) {
    API.get('/account/' + publicId, {}).then((res) => {
      this.setState({
        account: res.data
      });
    }).catch((error) => {
      this.setState({ error: error.response && error.response.data.message ? error.response.data.message : 'Error' });
    });
  }

  render() {
    const account = this.state.account;
    const editId = this.state.editId;
    const showCopyButton = editId ? true : false;

    return (
      <React.Fragment>
        <NavigationBar cn="account" title="Account - View"/>

        <Account account={account} editId={editId} showCopyButton={showCopyButton} error={this.state.error}/>

      </React.Fragment>

    );
  }
}

export default AccountView;
