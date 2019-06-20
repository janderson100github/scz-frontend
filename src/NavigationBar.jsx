import React from "react";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav">
        <Link className="link" to={'/'}><i className="fas fa-home cicon"/></Link>
        <span className={'title ' + this.props.cn}>{this.props.title}</span>
      </div>

    );
  }
}

export default NavigationBar;
