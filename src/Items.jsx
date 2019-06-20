import React from "react";
import {Link} from "react-router-dom";
import ItemInfoModal from "./ItemInfoModal";
import API from "./utils/API";
import coupon1 from "./images/coupon1.png";

class Items extends React.Component {

  constructor(props) {
    super(props);
  }

  deleteItem(itemId) {
    let cont = confirm('Delete item?');
    if (!cont || !this.props.fromAccountEditId) {
      return;
    }
    this.delete(this.props.fromAccountEditId, itemId);
  }


  delete(accountEditId, itemPublicId) {
    API.delete('/item', {
      headers: { "Content-Type": "application/json" },
      data: { itemPublicId: itemPublicId, accountEditId: accountEditId }
    }).then((res) => {
      window.location.reload();
    }).catch((error) => {
      this.setState({
        error: "Error"
      });
    });
  }


  render() {
    const items = this.props.items ? this.props.items : [];
    const fromAccountEditId = this.props.fromAccountEditId ? this.props.fromAccountEditId : null;
    const hideEditOptions = fromAccountEditId ? false : true;
    const showHeader = items.length > 0;

    return (
      <React.Fragment>
        <table className="table">
          {  showHeader &&
          <thead className="thead-light">
          <tr>
            <th>Credit</th>
            <th>Actions</th>
          </tr>
          </thead>
          }
          <tbody>
          {items.map((item, index) => {
            let transferParamString = fromAccountEditId ? '?fromAccountEditId=' + fromAccountEditId : "";
            transferParamString += '&fromItemPublicId=' + item.publicId + '&max=' + item.amount;
            let couponParamString = item.publicId + '?accountEditId=' + (fromAccountEditId ? fromAccountEditId : "") + '&max=' + item.amount;

            let info = 'info';

            return (
              <tr key={index}>
                <td><Link style={{ fontWeight: 'bold' }} className="link"
                          to={'/' + item.pool.name}>{item.pool.name}</Link> &nbsp; <span
                  className="item-quantity">{item.amount}</span></td>
                <td>
                  &nbsp;
                  <ItemInfoModal item={item} accountEditId={fromAccountEditId}/>
                  <span className={hideEditOptions ? 'hidden' : ''} title="transfer">
                    <Link className="link" to={'/transfer/create' + transferParamString}>
                      <i className="fas fa-exchange-alt cicon"/>
                    </Link>
                  </span>
                  &nbsp; &nbsp;
                  <span className={hideEditOptions ? 'hidden' : ''} title="Create coupon">
                    <Link className="link" to={'/coupon/create/' + couponParamString}>
                      <img className="coupon" src={coupon1}/>
                    </Link>
                  </span>
                  &nbsp;
                  <span className={hideEditOptions ? 'hidden' : ''} title="Delete">
                      <i className="far fa-minus-square cicon clickable"
                         onClick={() => this.deleteItem(item.publicId)}/>
                  </span>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </React.Fragment>

    );
  }
}

export default Items;
