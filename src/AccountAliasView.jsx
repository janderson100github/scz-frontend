import React from "react";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import Account from "./Account";
import Pool from "./Pool";

class AccountAliasView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      account: null,
      pool: null,
      error: null
    };
  }

  componentDidMount() {
    this.get(this.props.match.params.alias);
  }

  get(alias) {
    API.get('/account/alias/' + alias, {}).then((res) => {
      this.setState({
        account: res.data
      });
    }).catch((error) => {
      this.getPool(alias);
    });
  }

  getPool(name) {
    API.get('/pool/' + name, {}).then((res) => {
      this.setState({
        pool: res.data
      });
    }).catch((error) => {
      this.setState({ error: error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Error' });
      this.props.history.push('/')
    });
  }

  render() {
    const account = this.state.account;
    const pool = this.state.pool;

    return (
      <div>
        { account &&
        <React.Fragment>
          <NavigationBar cn="account" title="Account"/>
          <Account account={account} error={this.state.error}/>
        </React.Fragment>
        }
        { pool &&
        <React.Fragment>
          <NavigationBar cn="pool" title="Credit"/>
          <Pool pool={pool} error={this.state.error}/>
        </React.Fragment>
        }
        <div className="error">{this.state.error}</div>
      </div>
    );
  }
}

export default AccountAliasView;
