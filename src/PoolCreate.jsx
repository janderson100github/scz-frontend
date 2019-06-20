import React from "react";
import NavigationBar from "./NavigationBar";
import {Link, withRouter} from "react-router-dom";
import API from "./utils/API";
import PoolForm from "./PoolForm";
import Pool from "./Pool";
import Account from "./Account";

class PoolCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      description: "",
      name: "",
      error: "",
      poolAccount: null
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitForm(event) {
    this.setState({
      error: ""
    });
    this.post(this.state.name, this.state.description);
    event.preventDefault();
  }

  post(name, description) {
    this.setState({
      poolAccount: null,
      error: ""
    });

    API.post('/pool', { name: name, description: description }).then((res) => {
      this.setState({
        poolAccount: res.data
      });
    }).catch((error) => {
      this.setState({
        error: error.response && error.response.data ? error.response.data.message : "Error"
      });
    });
  }

  render() {
    const pool = this.state.poolAccount ? this.state.poolAccount.pool : null;
    const poolEditId = pool && pool.editId ? pool.editId : null;
    const account = this.state.poolAccount ? this.state.poolAccount.account : null;
    const accountEditId = account && account.editId ? account.editId : null;

    let copyText = pool ? 'Credit Name: ' + pool.name + '\nCredit Public ID: ' + pool.publicId + '\nCredit Edit ID: ' + poolEditId : '';
    copyText += account ? '\nAccount Public ID: ' + account.publicId + '\nAccount Edit ID: ' + accountEditId : '';

    const CopyButton = withRouter(({ history }) => (
      <button
        className="btn btn-outline-secondary"
        type='button'
        onClick={() => {
          navigator.clipboard.writeText(copyText)
        }}
      >Copy IDs to clipboard</button>
    ));

    return (
      <React.Fragment>
        <NavigationBar cn="pool" title="Credit - Create"/>

        { pool && <div style={{ marginBottom: '10px' }}><CopyButton/><br/><br/></div> }
        { !pool &&
        <PoolForm handleChange={this.handleChange.bind(this)} handleSubmitForm={this.handleSubmitForm.bind(this)}/> }
        { pool && <Pool pool={pool} editId={poolEditId} showTitle={true}/> }
        <br/>
        { account && <Account account={account} editId={accountEditId} infoMessage="" showTitle={true}/> }

        <div className="error">{this.state.error}</div>

      </React.Fragment>
    );
  }
}

export default PoolCreate;
