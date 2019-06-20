import React from "react";
import queryString from "query-string";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import {Link} from "react-router-dom";
import Item from "./Item";

class AccountEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      item: {},
      accountEditId: null,
      error: ""
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    let accountEditId = queryParams.accountEditId ? queryParams.accountEditId : null;
    let itemId = this.props.match.params.itemPublicId;
    this.setState({
      accountEditId: accountEditId
    });
    this.get(itemId);
  }

  get(itemId) {
    API.get('/item/' + itemId, {}).then((res) => {
      this.setState({
        item: { ...res.data },
        error: ""
      });
    }).catch((error) => {
      this.setState({
        error: error.response && error.response.data.message ? error.response.data.message : 'Error'
      });
    });
  }

  render() {
    const item = this.state.item;
    const pool = item && item.pool ? item.pool : {};

    return (
      <React.Fragment>
        <NavigationBar cn="coupon" title="Coupon - Redeemed"/>
        <div>
          <span style={{ color: 'green' }}>Success.</span><br/>
        </div>
        <div className="error">{this.state.error}</div>
        <Item item={this.state.item} pool={pool} showPrivateInfo="true"/>
      </React.Fragment>
    );
  }
}

export default AccountEdit;
