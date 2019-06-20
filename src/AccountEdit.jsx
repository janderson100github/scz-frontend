import React from "react";
import queryString from "query-string";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import Items from "./Items";
import {Link} from "react-router-dom";
import coupon1 from "./images/coupon1.png";


class AccountEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      account: {},
      editId: "",
      description: "",
      verificationId: "",
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
    this.put(this.state.editId, this.state.verificationId, this.state.description, this.state.account.alias);
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
        error: error.response && error.response.data.message ? error.response.data.message : 'Error'
      });
    });
  }

  put(editId, verificationId, description, alias) {
    API.put('/account', {
      editId: editId,
      verificationId: verificationId,
      description: description,
      alias: alias
    }).then((res) => {
      this.props.history.push('/account/view/' + res.data.publicId + '?editId=' + res.data.editId);
    }).catch((error) => {
      this.setState({
        error: error.response && error.response.data.message ? error.response.data.message : 'Error'
      });
    });
  }

  render() {
    const fromAccountEditId = this.state.editId && this.state.editId != '' ? this.state.editId : null;
    const items = this.state.account ? this.state.account.items : [];
    const showVerificationCode = !(this.state.account && this.state.account.verifiedInfo && this.state.account.verifiedInfo.length > 0);

    return (
      <React.Fragment>
        <NavigationBar cn="account" title="Account - Edit"/>

        <form onSubmit={event => this.handleSubmitForm(event)}>

          <label>Description:</label><br/>
          <textarea className="form-control rounded-0" style={{ width: '100%' }} rows="8"
                    value={this.state.description} name="description" onChange={event => this.handleChange(event)}
          />
          <br/>
          { showVerificationCode &&
          <div>
            <label>Verification Code</label><br/>
            <input maxLength="19" className="form-control" type="text"
                   placeholder="optional" name="verificationId" onChange={event => this.handleChange(event)}
            />
            <br/>
          </div>
          }
          <label>Edit ID</label><br/>
          <input maxLength="19" className="form-control" type="text" defaultValue={this.state.editId}
                 placeholder="Edit ID" name="editId" onChange={event => this.handleChange(event)}
          />
          <br/>
          <div className="form-bar">
            <Link className="link cancel" to={'/account/view/' + this.state.account.publicId}>Cancel</Link>
            <input className="btn btn-primary submit" type="submit" value="Submit"/>
          </div>
        </form>

        <div className="error">{this.state.error}</div>
        <br/>


        <br/>
        <br/>
        <br/>
        <br/>
        <Link className="link" to={'/coupon/view/' + fromAccountEditId}>
          <img className="coupon" src={coupon1}/>View Active Coupons
        </Link>
        <br/><br/><br/><br/>
        <Items items={items} fromAccountEditId={fromAccountEditId}/>

      </React.Fragment>

    )
      ;
  }
}

export default AccountEdit;
