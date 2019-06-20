import React from "react";
import NavigationBar from "./NavigationBar";
import API from "./utils/API";
import {Link} from "react-router-dom";

class AccountCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      description: "",
      alias: "",
      host: "",
      error: null
    };
  }

  componentDidMount() {
    let host = window.location.hostname;
    this.setState({
      host: host
    });
  }

  handleSubmitForm(event) {
    this.setState({
      error: ""
    });
    this.post(this.state.alias, this.state.description);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  post(alias, description) {
    API.post('/account', { alias: alias, description: description }).then((res) => {
      this.props.history.push('/account/view/' + res.data.publicId + '?editId=' + res.data.editId);
    }).catch((error) => {
      this.setState({
        error: error.respone && error.response.data && error.response.message ? error.response.data.message : "Error"
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar cn="account" title="Account - Create"/>

        <form onSubmit={event => this.handleSubmitForm(event)}>
          <label>Alias</label><br/>
          <input maxLength="19" className="form-control" type="text"
                 placeholder="optional" name="alias" onChange={event => this.handleChange(event)}
          /><br/>
          <div style={{ color: '#aaa' }}>http://{this.state.host}/{this.state.alias}</div>
          <br/><br/><br/>
          <label>Description:</label><br/>
          <textarea className="form-control rounded-0" style={{ width: '100%' }} rows="8"
                    onChange={event => this.handleChange(event)}
                    name="description"
                    placeholder="Tell the public about you, your cause, or anything you want."/>
          <br/>
          <div className="form-bar">
            <Link className="btn btn-outline-secondary" to={'/'}>Cancel</Link>
            <input className="btn btn-primary submit" type="submit" value="Submit"/>
          </div>
        </form>

        <div className="error">{this.state.error}</div>
      </React.Fragment>
    );
  }
}

export default AccountCreate;
