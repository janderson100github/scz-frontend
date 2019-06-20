import React from "react";
import {Link} from "react-router-dom";

class PoolForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.props.handleSubmitForm(event)}>
          <label>Name</label>
          <input type="text" className="form-control" name="name"
                 onChange={event => this.props.handleChange(event)} placeholder="MyOrganization"
          />
          <br/>
          <label>Description:</label><br/>
          <textarea className="form-control rounded-0" style={{ width: '100%' }} rows="8"
                    onChange={event => this.props.handleChange(event)}
                    name="description"
                    placeholder="These credits are..."/>
          <br/>
          <div className="form-bar">
            <Link className="btn btn-outline-secondary" to={'/'}>Cancel</Link>
            <input className="btn btn-primary submit" type="submit" value="Submit"/>
          </div>
        </form>
      </div>

    );
  }
}

export default PoolForm;
