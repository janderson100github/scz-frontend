import React from "react";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import {Link, withRouter} from "react-router-dom";

class CouponsView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      coupons: [],
      accountEditId: null,
      error: ""
    };
  }

  componentDidMount() {
    this.get(this.props.match.params.accountEditId);
  }

  get(accountEditId) {
    API.get('/coupon/' + accountEditId, {}).then((res) => {
      this.setState({
        coupons: res.data.coupons
      });
    }).catch((error) => {
      error: error.response.data.message ? error.response.data.message : 'Error'
    });
  }

  render() {
    const coupons = this.state.coupons;
    let host = window.location.hostname;

    return (
      <React.Fragment>
        <NavigationBar cn="coupon" title="Coupon"/>

        <table className="table">
          <thead className="thead-light">
          <tr>
            <th>Credit</th>
            <th>Amount</th>
            <th>Coupon</th>
            <th>URL</th>
          </tr>
          </thead>
          <tbody>
          {coupons.map((coupon, index) => {
            const poolName = coupon && coupon.pool ? coupon.pool.name : "";

            return (
              <tr key={index}>
                <td>{poolName}</td>
                <td>{coupon.amount}</td>
                <td>{coupon.publicId}</td>
                <td><Link className="link"
                          to={'/coupon/' + coupon.publicId}>http://{host}/coupon/{coupon.publicId}</Link></td>
              </tr>
            );
          })}
          </tbody>
        </table>


      </React.Fragment>

    );
  }
}

export default CouponsView;
