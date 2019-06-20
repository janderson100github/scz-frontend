import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import Transfer from "./Transfer";
import TransferView from "./TransferView";
import AccountAliasView from "./AccountAliasView";
import AccountView from "./AccountView";
import AccountCreate from "./AccountCreate";
import AccountEdit from "./AccountEdit";
import AccountDelete from "./AccountDelete";
import AccountDeleted from "./AccountDeleted";
import PoolCreate from "./PoolCreate";
import PoolView from "./PoolView";
import PoolEdit from "./PoolEdit";
import PoolDelete from "./PoolDelete";
import PoolDeleted from "./PoolDeleted";
import VerificationGenerator from "./VerificationGenerator";
import CouponGenerator from "./CouponGenerator";
import CouponsView from "./CouponsView";
import CouponView from "./CouponView";
import CouponRedeemed from "./CouponRedeemed";

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/:alias' component={AccountAliasView}/>
          <Route exact path='/transfer/create' component={Transfer}/>
          <Route exact path='/transfer/view/:transactionId' component={TransferView}/>
          <Route exact path='/account/view/:publicId' component={AccountView}/>
          <Route exact path='/account/create' component={AccountCreate}/>
          <Route exact path='/account/edit/:publicId' component={AccountEdit}/>
          <Route exact path='/account/delete/:publicId' component={AccountDelete}/>
          <Route exact path='/account/deleted/:publicId' component={AccountDeleted}/>
          <Route exact path='/credit/create' component={PoolCreate}/>
          <Route exact path='/credit/edit/:name' component={PoolEdit}/>
          <Route exact path='/credit/view/:name' component={PoolView}/>
          <Route exact path='/credit/delete/:name' component={PoolDelete}/>
          <Route exact path='/credit/deleted/:name' component={PoolDeleted}/>
          <Route exact path='/verification/generator' component={VerificationGenerator}/>
          <Route exact path='/coupon/create/:itemId' component={CouponGenerator}/>
          <Route exact path='/coupon/view/:accountEditId' component={CouponsView}/>
          <Route exact path='/coupon/redeemed/:itemPublicId' component={CouponRedeemed}/>
          <Route exact path='/coupon/:publicId' component={CouponView}/>
        </Switch>
      </React.Fragment>

    );
  }
}

export default Main;
