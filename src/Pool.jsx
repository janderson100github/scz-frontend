import React from "react";
import {Link} from "react-router-dom";
import Social from "./Social";

class Pool extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let pool = this.props.pool;
    let error = this.props.error;
    let editId = this.props.editId;
    const host = window.location.hostname;
    const url = window.location.href;

    let editIdRow;
    let editRow;
    let deleteRow;
    if (editId) {
      editIdRow = <div><label>Edit ID</label><span className="value">{this.props.editId}</span></div>;
      editRow =
        <Link className="link" to={'/credit/edit/' + pool.name + '?editId=' + editId}>
          <i className="far fa-edit cicon"/> Edit</Link>;
      deleteRow =
        <Link className="link" to={'/credit/delete/' + pool.name + '?editId=' + editId}>
          <i className="far fa-minus-square cicon"/> Delete</Link>;
    }

    return (
      <React.Fragment>
        { this.props.showTitle &&
        <div className="pool" style={{ paddingBottom: '5px' }}><Link className="link"
                                                                     to={'/credit/view/' + pool.name}>Credit</Link>
        </div>
        }
        <div>
          <div><label>Name</label><span className="value">{pool.name}</span></div>
          <div>
            <label>URL</label>
            <Link className="link value" to={'/' + pool.name}>{'http://' + host + '/' + pool.name}</Link>
          </div>
          { pool.verifiedInfo &&
          <div><label>Verified</label><span className="value">{pool.verifiedInfo}</span></div> }
          {editIdRow}
          <div><label>Score</label><span className="value">{pool.level}</span></div>
          <div><label>Size</label><span className="value">{pool.total}</span></div>
          { pool.html && <div className="description" dangerouslySetInnerHTML={{ __html: pool.description }}/> }
          { !pool.html && <div className="description">{pool.description}</div> }
          {editRow}
          <br/>
          {deleteRow}
        </div>
        <div className="error">{error}</div>
        <Social title={pool.name}/>
      </React.Fragment>

    );
  }
}

export default Pool;
