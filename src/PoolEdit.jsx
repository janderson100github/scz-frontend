import React from "react";
import queryString from "query-string";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import {Link} from "react-router-dom";


class PoolEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pool: {},
      editId: "",
      description: "",
      name: "",
      verificationCode: "",
      error: ""
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    let editId = queryParams.editId ? queryParams.editId : "";
    this.setState({
      editId: editId
    });
    this.get(this.props.match.params.name);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitForm(event) {
    this.put(this.state.name, this.state.editId, this.state.pool.publicId, this.state.description, this.state.verificationCode);
    event.preventDefault();
  }

  get(name) {
    API.get('/pool/' + name, {}).then((res) => {
      let editId = this.state.pool.editId;
      this.setState({
        pool: { ...res.data },
        description: res.data.description,
        name: res.data.name,
        error: ""
      });
    }).catch((error) => {
      this.setState({
        error: error.response.data.message ? error.response.data.message : 'Error',
      });
    });
  }

  put(name, editId, publicId, description, verificationCode) {
    API.put('/pool', {
      name: name,
      editId: editId,
      publicId: publicId,
      description: description,
      verificationCode: verificationCode
    }).then((res) => {
      this.props.history.push('/credit/view/' + res.data.name + '?editId=' + res.data.editId);
    }).catch((error) => {
      this.setState({
        error: error.response.data.message ? error.response.data.message : 'Error',
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar cn="pool" title="Credit - Edit"/>

        <form onSubmit={event => this.handleSubmitForm(event)}>

          {this.state.name} <br/><br/>
          <label>Description:</label><br/>
          <textarea className="form-control rounded-0" style={{ width: '100%' }} rows="8"
                    value={this.state.description} name="description" onChange={event => this.handleChange(event)}
          />
          <br/>
          <label>Verification Code</label><br/>
          <input maxLength="19" className="form-control" type="text"
                 placeholder="optional" name="verificationCode" onChange={event => this.handleChange(event)}
          />
          <br/>
          <label>Edit ID</label><br/>
          <input maxLength="19" className="form-control" type="text" defaultValue={this.state.editId}
                 placeholder="Edit ID" name="editId" onChange={event => this.handleChange(event)}
          />
          <br/>
          <div className="form-bar">
            <Link className="link cancel" to={'/credit/view/' + this.state.pool.name}>Cancel</Link>
            <input className="btn btn-primary submit" type="submit" value="Submit"/>
          </div>
        </form>

        <div className="error">{this.state.error}</div>

      </React.Fragment>

    )
      ;
  }
}

export default PoolEdit;
