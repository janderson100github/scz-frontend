import React from "react";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import {Link} from "react-router-dom";
import queryString from "query-string";


class CouponGenerator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      itemId: "",
      accountEditId: "",
      amount: "10.00",
      quantity: 1,
      message: null,
      error: ""
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    let accountEditId = queryParams.accountEditId ? queryParams.accountEditId : "";
    this.setState({
      accountEditId: accountEditId,
      itemId: this.props.match.params.itemId
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitForm(event) {
    this.post(this.state.itemId, this.state.accountEditId, this.state.amount, this.state.quantity, this.state.message);
    event.preventDefault();
  }

  post(itemId, accountEditId, amount, quantity, message) {
    this.setState({
      error: ''
    });

    API.post('/coupon', {
      itemPublicId: itemId,
      accountEditId: accountEditId,
      amount: amount,
      quantity: quantity,
      message: message
    }).then((res) => {
      this.props.history.push('/coupon/view/' + accountEditId);
    }).catch((error) => {
      this.setState({
        error: error.response.data.message ? error.response.data.message : 'Error',
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar cn="coupon" title="Coupon - Create"/>

        <form onSubmit={event => this.handleSubmitForm(event)}>

          <label>Item ID</label><br/>
          <input maxLength="19" className="form-control" type="text"
                 defaultValue={this.state.itemId}
                 name="itemId" onChange={event => this.handleChange(event)}
          />
          <br/>
          <label>Account Edit ID</label><br/>
          <input maxLength="128" className="form-control" type="text"
                 defaultValue={this.state.accountEditId}
                 name="accountEditId" onChange={event => this.handleChange(event)}
          />
          <br/>
          <label>Amount</label><br/>
          <input maxLength="7" className="form-control" type="text"
                 defaultValue={this.state.amount}
                 placeholder="10.00" name="amount" onChange={event => this.handleChange(event)}
          />
          <br/>
          <label>Quantity</label><br/>
          <input maxLength="4" className="form-control" type="text" defaultValue="1"
                 placeholder="1" name="quantity" onChange={event => this.handleChange(event)}
          />
          <br/>
          <label>Message</label><br/>
          <input maxLength="250" className="form-control" type="text"
                 placeholder="optional" name="message" onChange={event => this.handleChange(event)}
          />
          <br/>
          <div className="form-bar">
            <Link className="link cancel" to={'/'}>Cancel</Link>
            <input className="btn btn-primary submit" type="submit" value="Submit"/>
          </div>
        </form>

        <div className="error">{this.state.error}</div>

      </React.Fragment>
    );
  }
}

export default CouponGenerator;
