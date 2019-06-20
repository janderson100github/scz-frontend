import React from "react";
import NavigationBar from "./NavigationBar";
import API from "./utils/API";
import queryString from "query-string";
import {Link} from "react-router-dom";

class Transfer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fromAccountEditId: "",
      toAccountPublicId: "",
      fromItemPublicId: "",
      amount: "",
      message: "",
      error: ""
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    let fromAccountEditId = queryParams.fromAccountEditId ? queryParams.fromAccountEditId : null;
    let fromItemPublicId = queryParams.fromItemPublicId ? queryParams.fromItemPublicId : null;
    let max = queryParams.max && queryParams.max <= 100 ? queryParams.max : "10";
    this.setState({
      fromAccountEditId: fromAccountEditId,
      fromItemPublicId: fromItemPublicId,
      amount: max
    });
  }

  handleSubmitForm(event) {
    this.setState({
      error: ""
    });
    this.post(this.state.amount, this.state.message, this.state.fromAccountEditId, this.state.toAccountPublicId, this.state.fromItemPublicId);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  post(amount, message, fromAccountEditId, toAccountPublicId, fromItemPublicId) {
    API.post('/transfer', {
      fromAccountEditId: fromAccountEditId,
      toAccountPublicId: toAccountPublicId,
      fromItemPublicId: fromItemPublicId,
      amount: amount,
      message: message
    }).then((res) => {
      let transfer = res.data;
      this.props.history.push('/transfer/view/' + transfer.transactionId);
    }).catch((error) => {
      this.setState({
        error: error.response.data.message ? error.response.data.message : 'Error',
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar cn="transfer" title="Transfer"/>

        <div>
          <form onSubmit={event => this.handleSubmitForm(event)}>
            <label>From Item ID</label>
            <input type="text" className="form-control" name="fromItemPublicId"
                   onChange={event => this.handleChange(event)}
                   defaultValue={this.state.fromItemPublicId}/>
            <br/>
            <label>From Account Edit ID</label>
            <input type="text" className="form-control" name="fromAccountEditId"
                   onChange={event => this.handleChange(event)}
                   defaultValue={this.state.fromAccountEditId}/>
            <br/>
            <label>To Account Public ID</label>
            <input type="text" className="form-control" name="toAccountPublicId"
                   onChange={event => this.handleChange(event)}/>
            <br/>
            <label>Amount</label>
            <input type="text" className="form-control" name="amount"
                   defaultValue={this.state.amount}
                   onChange={event => this.handleChange(event)}/>
            <br/>
            <label>Message</label>
            <input type="text" className="form-control" name="message"
                   maxLength="255"
                   placeholder="optional (max 250 chars)"
                   onChange={event => this.handleChange(event)}/>
            <br/>
            <div className="form-bar">
              <Link className="btn btn-outline-secondary" to={'/'}>Cancel</Link>
              <input className="btn btn-primary submit" type="submit" value="Submit"/>
            </div>
          </form>

          <div className="error">{this.state.error}</div>
        </div>

      </React.Fragment>
    );
  }
}

export default Transfer;
