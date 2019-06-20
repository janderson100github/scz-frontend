import React from "react";
import queryString from "query-string";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import Items from "./Items";
import {Link} from "react-router-dom";


class AccountDelete extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      account: { publicId: "" },
      editId: "",
      description: "",
      error: ""
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    let editId = queryParams.editId ? queryParams.editId : "";
    this.setState({
      editId: editId
    });
    this.get(this.props.match.params.publicId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitForm(event) {
    this.delete(this.state.account.publicId, this.state.editId);
    event.preventDefault();
  }

  get(publicId) {
    API.get('/account/' + publicId, {}).then((res) => {
      let editId = this.state.account.editId;
      this.setState({
        account: { ...res.data },
        description: res.data.description,
        error: ""
      });
    }).catch((error) => {
      this.setState({
        error: "Public ID: No account.",
      });
    });
  }

  delete(publicId, editId) {
    API.delete('/account', {
      headers: { "Content-Type": "application/json" },
      data: { editId: editId, publicId: publicId }
    }).then((res) => {
      this.props.history.push('/account/deleted/' + publicId);
    }).catch((error) => {
      this.setState({
        error: "Edit ID: No account."
      });
    });
  }

  render() {
    const fromAccountEditId = this.state.editId && this.state.editId != '' ? this.state.editId : null;
    const items = this.state.account ? this.state.account.items : [];

    return (
      <React.Fragment>
        <NavigationBar cn="account" title="Account - Delete"/>


        <form onSubmit={event => this.handleSubmitForm(event)}>
          <div className="description">{this.state.description}</div>
          <br/>
          {this.state.account.publicId}<br/><br/>
          <label>Edit ID</label><br/>
          <input maxLength="19" className="form-control" type="text" defaultValue={this.state.editId}
                 placeholder="Edit ID" name="editId" onChange={event => this.handleChange(event)}
          />
          <br/>
          <div className="form-bar">
            <Link className="link cancel" to={'/account/view/' + this.state.account.publicId}>Cancel</Link>
            <input className="btn btn-primary submit" type="submit" value="Delete Account"/>
          </div>
        </form>

        <div className="error">{this.state.error}</div>

        <br/>
        <br/>
        <br/>
        <br/>
        <Items items={items} fromAccountEditId={fromAccountEditId}/>

      </React.Fragment>

    );
  }
}

export default AccountDelete;
