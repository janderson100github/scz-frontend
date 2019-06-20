import React from "react";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import {Link, withRouter} from "react-router-dom";
import QRCode from "qrcode.react";

class CouponView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      coupon: { pool: {} },
      accountEditId: "",
      couponPublicId: "",
      error: ""
    };
  }

  componentDidMount() {
    let couponPublicId = this.props.match.params.publicId;
    this.setState({
      couponPublicId: couponPublicId
    });
    this.get(couponPublicId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitForm(event) {
    this.post(this.state.accountEditId, this.state.couponPublicId);
    event.preventDefault();
  }

  get(publicId) {
    API.get('/coupon/single/' + publicId, {}).then((res) => {
      this.setState({
        coupon: res.data
      });
    }).catch((error) => {
      this.setState({
        error: error.response && error.response.data.message ? error.response.data.message : 'Error'
      });
    });
  }

  post(accountEditId, couponPublicId) {
    this.setState({
      error: ""
    });

    API.post('/coupon/redeem', { accountEditId: accountEditId, couponPublicId: couponPublicId }).then((res) => {
      this.props.history.push('/coupon/redeemed/' + res.data.publicId);
    }).catch((error) => {
      this.setState({
        error: error.response && error.response.data.message ? error.response.data.message : 'Error'
      });
    });
  }

  render() {
    const coupon = this.state.coupon;
    let host = window.location.hostname;
    let url = window.location.href;

    return (
      <React.Fragment>
        <NavigationBar cn="coupon" title="Coupon"/>

        <div>
          <Link className="link" style={{ fontSize: 'small' }}
                to={'/coupon/' + coupon.publicId}>http://{host}/coupon/{coupon.publicId}</Link>
          <br/><br/>
          <label>Credit</label>
          <Link className="link" to={'/credit/view/' + coupon.pool.name}>
            <span className="value">{coupon.pool.name}</span>
          </Link>
          <br/>
          <label>Amount</label><span className="value">{coupon.amount}</span><br/><br/>
          <span className="" style={{ fontSize: 'large' }}>{coupon.publicId}</span><br/>
          <br/><br/>
          <div className="description">
            { coupon.message }
          </div>
        </div>

        <br/><br/><br/>
        <div>
          <form onSubmit={event => this.handleSubmitForm(event)}>
            <label>Account Edit ID</label><br/>
            <input maxLength="19" className="form-control" type="text" defaultValue={this.state.editId}
                   name="accountEditId" onChange={event => this.handleChange(event)}
            />
            <br/>
            <div className="form-bar">
              <input className="btn btn-primary submit" type="submit" value="Add to Account"/>
            </div>
          </form>
          <div className="error">{this.state.error}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <br/><br/><br/>
          <QRCode value={url}/>
          <br/><br/><br/>
        </div>

      </React.Fragment>

    );
  }
}

export default CouponView;
