import React from "react";
import Items from "./Items";
import {Link, withRouter} from "react-router-dom";
import Social from "./Social";

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let account = this.props.account;
    let error = this.props.error;
    let editId = this.props.editId;
    const showVerifiedInfo = account && account.verifiedInfo && account.verifiedInfo.length > 0;


    let displayAsHtml = account.html;

    let editIdRow;
    let editRow;
    let deleteRow;
    if (editId) {
      editIdRow = <div><label>Edit ID</label><span className="value">{this.props.editId}</span></div>;
      editRow =
        <Link className="link" to={'/account/edit/' + account.publicId + '?editId=' + editId}>
          <i className="far fa-edit cicon"/> Edit</Link>;
      deleteRow =
        <Link className="link" to={'/account/delete/' + account.publicId + '?editId=' + editId}>
          <i className="far fa-minus-square cicon"/> Delete</Link>;
    }

    const host = window.location.hostname;
    const alias = account.alias && account.alias != '' ? account.alias : null;

    let copyText = account ? 'Account Public ID: ' + account.publicId : '';
    copyText += editId ? '\nAccount Edit ID: ' + editId : '';
    const CopyButton = withRouter(({ history }) => (
      <button
        className="btn btn-outline-secondary"
        type='button'
        onClick={() => {
          navigator.clipboard.writeText(copyText)
        }}
      >Copy IDs to clipboard</button>
    ));

    return (
      <React.Fragment>
        { editId && this.props.showCopyButton && <div style={{ marginBottom: '10px' }}><CopyButton/></div> }
        { this.props.showTitle &&
        <div className="account" style={{ paddingBottom: '5px' }}>
          <Link className="link" to={'/account/view/' + account.publicId}>Account</Link>
        </div>
        }
        <div>
          { alias &&
          <div><label>URL</label><Link className="link value" to={'/' + alias}>{'http://' + host + '/' + alias}</Link>
          </div> }
          <div><label>Public ID</label><span className="value">{account.publicId}</span></div>
          {editIdRow}
          { showVerifiedInfo &&
          <div><label>Verified</label><span className="value">{account.verifiedInfo}</span></div>
          }
          <div><label>Score</label><span className="value">{account.score}</span></div>
          { displayAsHtml && <div className="description" dangerouslySetInnerHTML={{ __html: account.description }}/> }
          { !displayAsHtml && <div className="description">{account.description}</div> }
          {editRow}
          <br/>
          {deleteRow}
        </div>
        <div className="error">{error}</div>
        <Social title={account.alias}/>


        <Items items={account.items} fromAccountEditId={editId}/>
      </React.Fragment>

    );
  }
}

export default Account;
