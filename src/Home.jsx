import React from "react";
import {Link} from "react-router-dom";
import NavigationBar from "./NavigationBar";
import AccountEditModal from "./AccountEditModal";
import AccountViewModal from "./AccountViewModal";
import PoolViewModal from "./PoolViewModal";
import PoolEditModal from "./PoolEditModal";
import CouponViewModal from "./CouponViewModal";

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar title="Social Credit Zone"/>

        <div className="home">
          <div style={{ lineHeight: '1.50' }}>
            <div class="pool" style={{ fontWeight: 'bold', paddingBottom: '5px' }}>Credits</div>
            <div style={{ paddingLeft: '15px' }}>
              <Link className="link" to={'/credit/create'}><i className="far fa-plus-square cicon"/><span
                className="pool">Create</span></Link>
              <br/>
              <PoolEditModal history={this.props.history}/>
              <PoolViewModal history={this.props.history}/>
            </div>
          </div>

          <br/>

          <div style={{ lineHeight: '1.50' }}>
            <div class="account" style={{ fontWeight: 'bold', paddingBottom: '5px' }}>Account</div>
            <div style={{ paddingLeft: '15px' }}>
              <Link className="link" to={'/account/create'}>
                <i className="far fa-plus-square cicon"/><span className="account">Create</span>
              </Link>
              <AccountEditModal history={this.props.history}/>
              <AccountViewModal history={this.props.history}/>
            </div>
          </div>

          <br/>

          <div style={{ lineHeight: '175%' }}>
            <Link className="link" to={'/transfer/create'}><i className="fas fa-exchange-alt cicon"/><span
              className="transfer">Transfer</span></Link>
          </div>

          <br/>
          <CouponViewModal history={this.props.history}/>
        </div>

        <br/>
        <br/>
        <br/>
        <div className="blurb">
          Create credits.
          Save them in an account.
          Give credits away with gift cards or by transfer.
          Share your account with others to show off your credit score.
        </div>

      </React.Fragment>

    )
      ;
  }
}

export default Home;
