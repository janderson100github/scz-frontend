import React from "react";
import {Link} from "react-router-dom";

class Items extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const item = this.props.item ? this.props.item : {};
    const pool = this.props.pool ? this.props.pool : {};
    const showPrivateInfo = this.props.showPrivateInfo ? true : false;
    let description = pool && pool.description ? pool.description : '';
    const isModal = this.props.modal ? this.props.modal : false;


    let maxWidthStyle = {};
    if (isModal) {
      maxWidthStyle = { maxWidth: '250px' };
    }

    description = description.replace(/<[^>]+>/g, '').substring(0, Math.min(description.length, 200));

    return (
      <React.Fragment>
        <div>
          <label>Credit</label><span className="value">{pool.name}</span><br/>
          <div style={maxWidthStyle} className="description">{description}</div>
        </div>
        <br/>
        <div>
          { showPrivateInfo &&
          <div><label>Transaction ID</label><span className="value">{item.transactionId}</span></div>
          }
          <label>Item ID</label><span className="value">{item.publicId}</span><br/>
          <label>Amount</label><span className="value">{item.amount}</span><br/>
          <label>Traded</label><span className="value">{item.level}</span><br/>
          { showPrivateInfo &&
          <div>
            <div style={maxWidthStyle} className="description">{item.message}</div>
          </div>
          }
        </div>
      </React.Fragment>

    );
  }
}

export default Items;
